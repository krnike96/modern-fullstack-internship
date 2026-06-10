import { Student, students } from "@/app/data/students";

// get all students
export async function GET() {
    return Response.json({
        status: "success",
        students
    });
}

// add student
export async function POST(req: Request) {
    const user = await req.json();

    if (!user || !isStudent(user))
        return Response.json({
            success: false,
            message: "user not created"
        })


    students.push(user);
    return Response.json({
        success: "success",
        message: "user created successfully",
        students: students
    })
}

// update entire student by id
export async function PUT(req: Request) {
    const data = await req.json();

    const updatedStudentIdx = students.findIndex((student) => {
        return student.id === data.id;
    });

    if(!isStudent(data)){
        return Response.json({
            status: 400,
            message: "Invalid JSON body"
        });
    }

    if (updatedStudentIdx === -1) {
        return Response.json({
            success: 404,
            message: "Resource not found"
        });
    }

    students[updatedStudentIdx] = data;

    return Response.json({
        success: "success",
        message: "Resource replaced successfully",
        newList: students
    });
}

// update name by id
export async function PATCH(req: Request) {
    const body = await req.json();

    const studentToUpdate = students.find((student) => {
        return student.id === body.id;
    })

    if (!studentToUpdate) {
        return Response.json({
            status: 404,
            message: "Resource not found"
        });
    }

    studentToUpdate.id = body.id;

    return Response.json({
        success: "success",
        message: "User is updated",
        studentToUpdate
    });
}

// delete student by id
export async function DELETE(req: Request) {
    const data = await req.json();

    const stdToDeleteIdx = students.findIndex((student) => {
        return student.id === data.id;
    })

    if (stdToDeleteIdx === -1) {
        return Response.json({
            success: "success",
            message: "Resource not found",
        })
    }

    students.splice(stdToDeleteIdx, 1);

    return Response.json({
        success: "success",
        message: "Student is removed successful",
        studentList: students
    });
}

function isStudent(obj: any): obj is Student{
    return (
        obj !== null &&
        typeof obj === "object" &&
        typeof obj.id === "number" &&
        typeof obj.name === "string" &&
        typeof obj.marks === "number" &&
        typeof obj.isPresent === "boolean"
    );
}
/*
    github.com/nishchalgv1/next-api-routes-dynamic-route-segments.git
*/