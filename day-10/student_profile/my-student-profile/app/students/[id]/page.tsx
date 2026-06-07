'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { graphql } from '@/app/lib/graphql'
import Link from 'next/link'

interface Student {
  id: string
  name: string
  email: string
  grade: string | null
  profileImage: string | null
}

export default function StudentProfilePage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', grade: '' })
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  // Fetch student
  const fetchStudent = async () => {
    try {
      const data = await graphql(`
        query GetStudent($id: ID!) {
          student(id: $id) {
            id
            name
            email
            grade
            profileImage
          }
        }
      `, { id })
      if (!data.student) {
        setError('Student not found')
        return
      }
      setStudent(data.student)
      setFormData({
        name: data.student.name,
        email: data.student.email,
        grade: data.student.grade || ''
      })
    } catch (err: any) {
      if (err.message === 'Unauthorized') router.push('/login')
      else setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudent()
  }, [id])

  // Update student
  const handleUpdate = async (e: any) => {
    e.preventDefault()
    try {
      const data = await graphql(`
        mutation UpdateStudent($id: ID!, $input: UpdateStudentInput!) {
          updateStudent(id: $id, input: $input) {
            id
            name
            email
            grade
          }
        }
      `, { id, input: formData })
      setStudent({ ...student!, ...data.updateStudent })
      setIsEditing(false)
    } catch (err: any) {
      setError(err.message)
    }
  }

  // Upload image
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const uploadFormData = new FormData()
    uploadFormData.append('image', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })
      const result = await res.json()
      if (result.imageUrl) {
        // Update student with new image URL
        await graphql(`
          mutation UpdateStudent($id: ID!, $input: UpdateStudentInput!) {
            updateStudent(id: $id, input: $input) {
              profileImage
            }
          }
        `, { id, input: { profileImage: result.imageUrl } })
        fetchStudent() // refresh
      } else {
        setError(result.error || 'Upload failed')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleLogout = async () => {
    const { logoutAction } = await import('@/app/actions/auth')
    await logoutAction()
    router.push('/login')
  }

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>
  if (error) return <div style={{ padding: 20, color: 'red' }}>Error: {error}</div>
  if (!student) return <div style={{ padding: 20 }}>Student not found</div>

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Link href="/students" style={{ color: 'blue', textDecoration: 'underline' }}>← Back to all students</Link>
        <button onClick={handleLogout} style={{ padding: '6px 12px' }}>Logout</button>
      </div>

      <div style={{ border: '1px solid #ccc', padding: 20, borderRadius: 4 }}>
        <h2>Student Profile</h2>

        <div style={{ marginBottom: 20 }}>
          {student.profileImage ? (
            <img src={student.profileImage} alt="Profile" style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 4 }} />
          ) : (
            <div style={{ width: 100, height: 100, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              No image
            </div>
          )}
          <div style={{ marginTop: 10 }}>
            <label style={{ display: 'inline-block', padding: '6px 12px', background: '#f0f0f0', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer' }}>
              Upload Profile Image
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </label>
            {uploading && <span style={{ marginLeft: 10 }}>Uploading...</span>}
          </div>
        </div>

        {!isEditing ? (
          <div>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Grade:</strong> {student.grade || 'Not set'}</p>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          </div>
        ) : (
          <form onSubmit={handleUpdate}>
            <div style={{ marginBottom: 10 }}>
              <label style={{ display: 'block' }}>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{ width: '100%', padding: 8 }}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={{ display: 'block' }}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{ width: '100%', padding: 8 }}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={{ display: 'block' }}>Grade</label>
              <input
                type="text"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                style={{ width: '100%', padding: 8 }}
              />
            </div>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)} style={{ marginLeft: 10 }}>Cancel</button>
          </form>
        )}
      </div>
    </div>
  )
}