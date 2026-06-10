// import { Feedback, feedbacks } from "@/app/data/model";


// // Add feedback
// export async function POST(req: Request) {
//     const data = await req.json();

//     const newFeedback: Feedback = {
//         id: feedbacks.length + 1,
//         message: data.messge
//     }

//     feedbacks.push(newFeedback);

//     return Response.json({
//         success: "success",
//         feedbacks: feedbacks
//     })

// }


// // Get Feedbacks
// export async function GET() {
//     if (feedbacks.length === 0) {
//         return Response.json({
//             message: "can't get feedbacks"
//         })
//     }

//     return Response.json({
//         success: "success",
//         message: "Feedbacks fetched successfully",
//         feedbacks
//     })
// }

// // delete feedback
// async function DELETE({ params }: any) {
//     let { id } = await params;
//     id = parseInt(id);

//     const dataToDeleteIdx = feedbacks.findIndex((feedback) => {
//         return feedback.id === id;
//     })

//     if (dataToDeleteIdx === -1) {
//         return Response.json({
//             message: "Feedback not found"
//         })
//     }

//     feedbacks.splice(dataToDeleteIdx, 1);

//     return Response.json({
//         success: "success",
//         message: "Feedback deleted successfully",
//          feedbacks
//     })
// }


let feedbacks = [
    {
        id: 1,
        message: "Everything is fine"
    },
    {
        id:2,
        message: "I did not understand api routes"
    },
    {
        id: 3,
        message: "Sir scolds on me"
    }
];

export async function GET(){
    return Response.json(feedbacks);
}
export async function POST(request:Request){
    const body = await request.json();
    const newFeedback = {
        id: feedbacks.length + 1,
        message: body.message 
    }

    feedbacks.push(newFeedback);

    return Response.json({
        status: 201,
        message: "New Feedback added",
        newFeedback
    })
}

export async function DELETE(request:Request){
    const {searchParams} = new URL(request.url);
    const id = searchParams.get("id");
    const fId = JSON.parse(id!);


    const output = feedbacks.filter((feedback) => {
        return feedback.id !== fId;
    })

    feedbacks = [...output];

    return Response.json({
        status: "Feedback deleted",
        feedbacks
    })
}