'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { graphql } from '@/app/lib/graphql'
import Link from 'next/link'

interface Student {
  id: string
  name: string
  email: string
  grade: string | null
  profileImage: string | null
}

export default function StudentsPage() {
  const router = useRouter()
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newStudent, setNewStudent] = useState({ name: '', email: '', grade: '' })
  const [error, setError] = useState('')

  const fetchStudents = async () => {
    try {
      const data = await graphql(`
        query {
          students {
            id
            name
            email
            grade
            profileImage
          }
        }
      `)
      setStudents(data.students)
    } catch (err: any) {
      if (err.message === 'Unauthorized') {
        router.push('/login')
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = await graphql(`
        mutation CreateStudent($input: CreateStudentInput!) {
          createStudent(input: $input) {
            id
            name
            email
            grade
          }
        }
      `, { input: newStudent })
      setStudents([data.createStudent, ...students])
      setNewStudent({ name: '', email: '', grade: '' })
      setShowAddForm(false)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this student?')) return
    try {
      await graphql(`
        mutation DeleteStudent($id: ID!) {
          deleteStudent(id: $id)
        }
      `, { id })
      setStudents(students.filter(s => s.id !== id))
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleLogout = async () => {
    const { logoutAction } = await import('@/app/actions/auth')
    await logoutAction()
    router.push('/login')
  }

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1>Student Profile Portal</h1>
        <button onClick={handleLogout} style={{ padding: '6px 12px' }}>Logout</button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : 'Add Student'}
        </button>
      </div>

      {showAddForm && (
        <div style={{ border: '1px solid #ccc', padding: 20, marginBottom: 20, borderRadius: 4 }}>
          <h3>Add New Student</h3>
          <form onSubmit={handleAdd}>
            <div style={{ marginBottom: 10 }}>
              <label style={{ display: 'block' }}>Name *</label>
              <input
                type="text"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                required
                style={{ width: '100%', padding: 8 }}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={{ display: 'block' }}>Email *</label>
              <input
                type="email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                required
                style={{ width: '100%', padding: 8 }}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={{ display: 'block' }}>Grade</label>
              <input
                type="text"
                value={newStudent.grade}
                onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
                style={{ width: '100%', padding: 8 }}
              />
            </div>
            <button type="submit">Create</button>
          </form>
        </div>
      )}

      {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}

      {/* Card Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {students.map(student => (
          <div key={student.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, backgroundColor: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              {student.profileImage ? (
                <img src={student.profileImage} alt="" style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%' }} />
              ) : (
                <div style={{ width: 100, height: 100, background: '#eee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  📷
                </div>
              )}
            </div>
            <h3 style={{ margin: '0 0 8px 0' }}>
              <Link href={`/students/${student.id}`} style={{ color: 'blue', textDecoration: 'underline' }}>
                {student.name}
              </Link>
            </h3>
            <p style={{ margin: '4px 0' }}><strong>Email:</strong> {student.email}</p>
            <p style={{ margin: '4px 0' }}><strong>Grade:</strong> {student.grade || '—'}</p>
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <Link href={`/students/${student.id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(student.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}