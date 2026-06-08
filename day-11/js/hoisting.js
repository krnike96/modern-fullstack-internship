// // hoisting
// console.log(a);
// // var a = 10;
// sayHello();
// let b = 50;
// function sayHello(){
//     console.log("Hello World");
// }


// lexical scope demo
function fun1(){
    var b = 20;
    function fun2(){
        var a = 100;
        function fun3(){
            console.log(a, b);
        }
        fun3();
    }
    fun2();
}
fun1();