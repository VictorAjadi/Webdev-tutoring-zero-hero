const promise = new Promise((resolve, reject)=>{
    const rand = Math.random();
    const success = rand> 0.5;
    if(success){
        resolve(rand + "Promise resolved successfully!");
    }else{
        reject(rand + "Promise rejected!");
    }
})

try {
    const result =await promise;
    console.log(result);
} catch (error) {
    console.error(error);
}
