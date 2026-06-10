/*
    Task:
    student feedabck page:
    textfield for writing feedbac
    addfeedback button
    beside the feedback message --> delete button
    link your addButton with POST requrest using fetch
    link your delte button with DELETE request using fetch
    fetch all your feedbacks -- for fetching all feedbacks

    implementtion:
    api/feedbacks/route/ts -- GET, POST, DELETE
    app/feedbacks/page.tsx -- input field for feeback and display feedback, add feedback and delete feedback
    feedback object {id, message}

    fetch(`/api/feedbacks?id=${id}`, {method, headers, body})
*/