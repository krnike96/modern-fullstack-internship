async function BlogsPerUser(props: any){
    const user = await props.params;
    const username = user.username;
    const blogId = user.blogId;
    return (
        <>
            <p>username : ${username}</p><br />
            <p>blog id : ${blogId}</p>
        </>
    )
}

export default BlogsPerUser;