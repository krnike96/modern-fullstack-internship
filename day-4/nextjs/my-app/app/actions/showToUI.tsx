import fs from 'fs/promises';
import path from 'path';

export default async function DisplayPage() {
    const jsonDirectory = path.join(process.cwd(), 'user.json');
    const fileContents = await fs.readFile(jsonDirectory, 'utf8');

    const users = JSON.parse(fileContents);

    return (
        <>
            <h1>User List</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {users.map((user, index) => (
                    <li key={user.id || index} style={{ padding: '0.5rem 0', borderBottom: '1px solid #ccc' }}>
                        <strong>{user.name}</strong> - {user.email}
                    </li>
                ))}
            </ul>
        </>
    );
}
