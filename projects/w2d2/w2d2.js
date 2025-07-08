
/// SOLUTION 1

function collatzChain(startingNum) {

    let chain = 1;
    let lastTerm = startingNum;

    while (lastTerm !== 1) {
        chain++;
        lastTerm % 2 === 0 ? lastTerm = lastTerm / 2 : lastTerm = lastTerm * 3 + 1;
    }

    return chain;
}


function highestCollatzChain(highestNum) {

    let startingNum = 2;
    let highestChain = 1;
    let highestChainNum = 2;

    while (startingNum < highestNum) {
        let chain = collatzChain(startingNum);
        if (chain > highestChain) {
            highestChain = chain;
            highestChainNum = startingNum;
        }
        startingNum++;
    }

    console.log(`Highest Chain: ${highestChain} , Highest Number : ${highestChainNum}`);
    return highestChain;
}

highestCollatzChain(1000000);













/// SOLUTION 2 (REFACTORED)


function collatzChainRefactored(startingNum, cache) {

    let chain = 1;
    let lastTerm = startingNum;

    while(lastTerm !==1){
        if(cache[lastTerm]){
            chain = chain + cache[lastTerm] - 1;
            break;
        }
        chain++;
        lastTerm = lastTerm % 2 === 0 ? lastTerm = lastTerm / 2 : lastTerm = lastTerm * 3 + 1;
    }

    cache[startingNum] = chain;
    return cache[startingNum];

}

function highestCollatzChainRefactored(highestNum) {

    cache = {};
    let highestChain = 1;
    let highestChainNum = 2;

    for (let i = 2; i < highestNum; i++) {
        let chain = collatzChainRefactored(i, cache)
        if (chain >= highestChain) {
            highestChain = chain;
            highestChainNum = i;
        }
    }

    console.log(`Highest Chain: ${highestChain} , Highest Number : ${highestChainNum}`);
    return highestChain;

}


highestCollatzChainRefactored(1000000);












