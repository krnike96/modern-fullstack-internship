// "use client"
// import { useState, useEffect } from "react";
// import submitFeedbackForm, { getAllFeedbacks } from "../actions/submitFeedbackForm";
// import { useFormStatus } from "react-dom";

// interface Feedback {
//     username: string,
//     email: string,
//     feedback: string
// }

// function Button() {
//     const { pending } = useFormStatus();

//     return (
//         <button type="submit"
//             disabled={pending}
//         >{pending ? "Sending" : "Send"}</button>
//     )
// }

// function FeedbackForm() {
//     const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);


//     async function handleSubmit(formData: FormData) {
//         await submitFeedbackForm(formData);
//         const data = await getAllFeedbacks();
//         setFeedbacks(data);
//     }

//     useEffect(() => {
//         async function fn() {
//             const data = await getAllFeedbacks();
//             setFeedbacks(data);
//         }
//         fn();
//         handleSubmit();
//     }, []);

//     return (
//         <div>
//             <h1>Feedback Form</h1>
//             <form action={handleSubmit}>
//                 <label htmlFor="username">Username: </label>
//                 <input type="text" name="username" id="username" />
//                 <br /> <br />

//                 <label htmlFor="email">Email: </label>
//                 <input type="text" name="email" id="email" />
//                 <br /><br />

//                 <label htmlFor="Feedback">Feedback: </label>
//                 <textarea name="feedback" id="Feedback"></textarea>
//                 <br /><br />
//                 <Button />
//             </form>
//             <br />
//             {
//                 [...feedbacks].reverse().map((feedback: Feedback, idx: number) => (
//                     <div key={idx} style={{ borderBottom: '1px solid #0a0d11' }}>
//                         <h3>username: {feedback.username}</h3>
//                         <h3>Email: {feedback.email}</h3>
//                         <h3>Feedback: {feedback.feedback}</h3>
//                     </div>
//                 ))
//             }
//         </div>
//     )
// }

// export default FeedbackForm;

import { addFeedback, getFeedbacks } from "../actions/databaseOperations";

async function FeedbackForm() {
    const feedbacks = await getFeedbacks();

    return (
        <div >
            <form action={addFeedback} >
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" placeholder="Username" required />
                <br />
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" placeholder="Email" required />
                <br />
                <label htmlFor="Feedback">Feedback: </label>
                <textarea name="feedback" placeholder="Feedback" required />
                <br />
                <button type="submit" >
                    Submit Feedback
                </button>
            </form>

            <hr />

            <h2>Submitted Feedbacks</h2>
            {
                feedbacks.map((feedback, index) => (
                    <div key={index} >
                        <h3>username: {feedback.username}</h3>
                        <h3>Email: {feedback.email}</h3>
                        <h3>Feedback: {feedback.feedback}</h3>
                    </div>
                ))
            }
        </div>
    );
}

export default FeedbackForm;

/*
    store in postgresql
    define environment variable .env.local
    try using db pooling
    install pg and dotenv
    
*/
