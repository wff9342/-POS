var inputs=[
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2',
    'ITEM000005',
    'ITEM000005',
    'ITEM000005'
];

window.onload=function printInventory() {
  var array=blmssylist(loadPromotions());
  var string=sxgc(loadAllItems(),inputs,array);
 console.log(string);
};
 function blmssylist(brr){
    var crr=[]
    for(var l=0;l<brr.length;l++)//遍历打折商品列表
    {
  	   if(brr[l].type=='BUY_TWO_GET_ONE_FREE')//找到买三送一商品的标签
  	   {
   	     crr=brr[l].barcodes;//吧标签给crr数组
    	 }
    }
    return crr;
  };
function sxgc(arr,inputs,crr){
    var tmp='';
    var sum=0;
    for(var i=0;i<arr.length;i++)
    {
        arr[i].count=0;  //为arr添加count(数量)属性;
        arr[i].discount=0;//为arr添加discount(折扣)属性;
        for(var j=0;j<inputs.length;j++)//遍历输入商品
        {
            if(inputs[j].indexOf('-')!=-1)//判断商品标签中有-
            {
                drr=inputs[j].split("-");//用drr数组接收input数组-前的标签为drr[0]
                                           //-后的数字为drr[1];
               if(arr[i].barcode==drr[0])//判断arr[i].barcode的标签是否与drr[0]的标签一致
                {
                   arr[i].count=drr[1];//一致则数量等于drr[1]的值
                }
            }else  if(arr[i].barcode==inputs[j])
            {
                arr[i].count++;
            }
        }
     }
         for(var i=0;i<arr.length;i++)
        {
            for(var k=0;k<crr.length;k++)//遍历满三送一商品的标签
            {
               if(arr[i].barcode==crr[k])
                {
                  arr[i].discount=Math.floor(arr[i].count/3);//arr的折扣为数量处于三的值
                }
            }
           if(arr[i].count!=0 )
           {
               var num=arr[i].price*(arr[i].count-arr[i].discount);
               //应付的钱数为实际购买的数量减去满减的数量,再乘以价格
               tmp+='名称:'+arr[i].name+',数量:'+arr[i].count+arr[i].unit+
                   ',单价:'+arr[i].price.toFixed(2)+'(元),小计:'+num.toFixed(2)+'(元)\n';
                   //object.toFixed(number)表示保留number位小数
               sum+=num;
           }
        }
       var pir='';
       var js=0;
     for(var i=0;i<arr.length;i++)
     {
         if(arr[i].discount!=0)//判断是否有打折商品
         {

            pir+='名称:'+arr[i].name+',数量:'+arr[i].discount+arr[i].unit+'\n';
            js+=arr[i].price*arr[i].discount;
         }
     }


     var currentDate = new Date(),
            year = dateDigitToString(currentDate.getFullYear()),
            month = dateDigitToString(currentDate.getMonth() + 1),
            date = dateDigitToString(currentDate.getDate()),
            hour = dateDigitToString(currentDate.getHours()),
            minute = dateDigitToString(currentDate.getMinutes()),
            second = dateDigitToString(currentDate.getSeconds()),
            formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
     var sc='***<没钱赚商店>购物清单***'+'\n'+'打印时间:'+formattedDateString+'\n----------------------'+'\n'+tmp+'----------------------\n挥泪赠送商品:\n'+pir+'----------------------\n'+
                '总计:'+sum.toFixed(2)+'(元)\n'+'节省:'+js.toFixed(2)+'(元)\n**********************';
    return sc;
};
dateDigitToString = function (num) {
        return num < 10 ? '0' + num : num;
    };
    function loadAllItems() {//商品库列表
        return [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00
            },
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00
            },
            {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00
            },
            {
                barcode: 'ITEM000004',
                name: '电池',
                unit: '个',
                price: 2.00
            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50
            }
        ];
    };

    function loadPromotions() {//打折列表
        return [
            {
                type: 'BUY_TWO_GET_ONE_FREE',
                barcodes: [
                    'ITEM000000',
                    'ITEM000001',
                    'ITEM000005'
                ]
            }
        ];
    };
