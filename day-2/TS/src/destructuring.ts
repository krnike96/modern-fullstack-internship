// Array Destructuring
const nums: number[] = [1,2,3,4,5];
const [first, second, third] = nums;

console.log(first, second, third);

const [,,,fourth, fifth] = nums;
console.log(fourth, fifth);

// Object Destructuring
enum VoteStatus{
    canVote = "YES",
    notEligible = "NO",
};

const user = {
    name : "Niket",
    age: 22,
    isEligibleToVote: VoteStatus.canVote,
};

const userName = user.name;
const voteStatus = user.isEligibleToVote;

console.log(`${userName} can vote? : ${voteStatus}`);

const {name, isEligibleToVote} = user;
console.log(`${name} can vote? : ${isEligibleToVote}`);
