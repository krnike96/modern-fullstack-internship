import Link from "next/link";

async function Users(props: any) {
    const user = await props.params;
    const username = user.username;
    const blogId = user.blogId;
  return (
    <div>
      <h1>This is Users Page</h1>
      <nav>
        <ul>
            <li>
                <Link href={`/${username}/blogs/${blogId}`}>Niket</Link>
            </li>
            <li>
                <Link href={`/${username}/blogs/${blogId}`}>Ram</Link>
            </li>
            <li>
                <Link href={`/${username}/blogs/${blogId}`}>Mohan</Link>
            </li>
        </ul>
      </nav>
    </div>
  )
}

export default Users;
