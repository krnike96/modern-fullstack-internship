
export interface Student{
    id: number,
    name: string,
    marks: number,
    isPresent: boolean
}

export const students: Student[] = [
    {
        id: 1,
        name: "Nikhil",
        marks: 19,
        isPresent: false
    },
    {
        id: 2,
        name: "Hari",
        marks: 39,
        isPresent: true
    },
    {
        id: 3,
        name: "Gopal",
        marks: 29,
        isPresent: false
    },
    {
        id: 4,
        name: "Mohan",
        marks: 14,
        isPresent: true
    },
    {
        id: 5,
        name: "Bhusan",
        marks: 11,
        isPresent: false
    }
];