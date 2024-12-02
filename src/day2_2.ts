import https = require('https');

const options = {
    hostname: "adventofcode.com",
    path: "/2024/day/2/input",
    headers: {
        Cookie: "session=53616c7465645f5f5acad219b1f2cf343abe3a60893a774ba6d787d4c6c7551caad28aaa2302511873a490416cafcb34c4d74b5c91ea812f008beb96eecd5200"
    }
};

https.get(options, (res: any) => {
    let data = '';
    let reports: number[][] = [];

    res.on('data', (chunk: any) => {
        data += chunk;
    });
    res.on('end', () => {
        data.trim().split('\n').forEach((line: string) => {
            reports.push(
                line.split(' ').map((level: string) => {
                 return Number(level);   
                }));
        });

        let safeReports = 0;
        console.log('Number of reports : ' + reports.length);
        reports.forEach((report: number[]) => {
            if(isSafe(report, true)){
                safeReports++;
            }
        });
        console.log(safeReports);
    });
});

function isSafe(report:number[], isOriginal:boolean):boolean {
    let isAscending = report[1] > report[0];
    for (let i = 1; i < report.length; i++) {
        const difference = report[i] - report[i - 1];
        if ((isAscending && difference <= 0) || (!isAscending && difference >= 0) || Math.abs(difference) < 1 || Math.abs(difference) > 3) {
            if(!isOriginal){
                return false
            }
            for (let j = 0; j < report.length; j++){
                if(isSafe([...report.slice(0, j), ...report.slice(j + 1)], false)){
                    return true;
                }
            }
            return false;
        }
    }
    return true;
};