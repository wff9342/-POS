
n printInventory(inputs) {

 var arr=loadAllItems();
    var tmp='';var sum=0;
    var xssum=0;
    var crr=loadPromotions()[0].barcodes;
    for(var i=0;i<arr.length;i++)
    {  
        arr[i].count=0;
        arr[i].discount=0;
        for(var j=0;j<inputs.length;j++)
        {
            if(inputs[j].indexOf('-')!=-1)
            {
                if(arr[i].barcode==inputs[j].substring(0,10))
                {
                   arr[i].count=parseInt(inputs[j][inputs[j].length-1]); 
                }
            }else  if(arr[i].barcode==inputs[j])
            {
                arr[i].count++;
            }
        }
     }  
         for(var i=0;i<arr.length;i++)
        { 
            for(var k=0;k<crr.length;k++)
            {
               if(arr[i].barcode==crr[k])
                {
                   xssum=Math.floor(arr[i].count/3);
                    if(xssum>=1){
                      arr[i].discount=xssum;
                    }
                }
               /* else
                {
                   
                    xssum=arr[i].price*arr[i].count;
                }*/
            }
           if(arr[i].count!=0 )
           {
               //alert(xssum);
               var num=arr[i].price*(arr[i].count-arr[i].discount);
               tmp+='名称:'+arr[i].name+',数量:'+arr[i].count+arr[i].unit+
                   ',单价:'+arr[i].price.toFixed(2)+'(元),小计:'+num.toFixed(2)+'(元)\n';   
               sum+=num;
           } 
        }
       var pir='';var js=0;
     for(var i=0;i<arr.length;i++)
     {    
         if(arr[i].count>=3)
         {
            
            pir+='名称:'+arr[i].name+',数量:'+arr[i].discount+arr[i].unit+'\n';
            js+=arr[i].price*arr[i].discount; 
         }
     }  
    dateDigitToString = function (num) {  
            return num < 10 ? '0' + num : num;  
        }; 
     var currentDate = new Date(),
            year = dateDigitToString(currentDate.getFullYear()),
            month = dateDigitToString(currentDate.getMonth() + 1),
            date = dateDigitToString(currentDate.getDate()),
            hour = dateDigitToString(currentDate.getHours()),
            minute = dateDigitToString(currentDate.getMinutes()),
            second = dateDigitToString(currentDate.getSeconds()),
            formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
     console.log('***<没钱赚商店>购物清单***'+'\n'+'打印时间:'+formattedDateString+'\n----------------------'+'\n'+tmp+'----------------------\n挥泪赠送商品:\n'+pir+'----------------------\n'+
                '总计:'+sum.toFixed(2)+'(元)\n'+'节省:'+js.toFixed(2)+'(元)\n**********************');
      
}

