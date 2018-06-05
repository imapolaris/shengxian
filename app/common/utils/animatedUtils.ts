export function getInterpolate(start:{x:number,y:number},end:{x:number,y:number},size:number){

    function CreateBezierPoints(anchorpoints:Array<{x:number,y:number}>, pointsAmount:number) {
        var points = [];
        for (var i = 0; i < pointsAmount; i++) {
            var point = MultiPointBezier(anchorpoints, i / pointsAmount);
            points.push(point);
        }
        return points;
    }

    function MultiPointBezier(points:Array<{x:number,y:number}>, t:number) {
        var len = points.length;
        var x = 0, y = 0;
        var erxiangshi = function (start:number, end:number) {
            var cs = 1, bcs = 1;
            while (end > 0) {
                cs *= start;
                bcs *= end;
                start--;
                end--;
            }
            return (cs / bcs);
        };
        for (var i = 0; i < len; i++) {
            var point = points[i];
            x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (erxiangshi(len - 1, i));
            y += point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (erxiangshi(len - 1, i));
        }
        return { x: x, y: y };
    }
    let inputRange:any=[],outputRangeX:any=[],outputRangeY:any=[];
    let maxNum=1;
    for(let i=0;i<size-1;i++){
        inputRange[i]=maxNum*(i/(size-1))
    }
    inputRange[size-1]=maxNum;
    let result=CreateBezierPoints([start,{ x: Math.max(end.y,start.y)/2, y:Math.max(end.x,start.x)/2  },end], size-1);
    result.push({...end});
    result.forEach((d,i)=>{
        outputRangeX[i]=d.x;
        outputRangeY[i]=d.y;
    });
    return {inputRange,outputRangeX,outputRangeY}
}