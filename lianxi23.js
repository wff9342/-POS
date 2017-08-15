'use strict'
var inputs=duqu('splb.txt');//定义全局变量input使得input得到splb文件读取的内容.

var string=dyjg(inputs);//定义全局变量string把通过dyjp函数得到的字符串.
xieru(string,'list.txt');//调用写入函数;

function duqu(intfile){
  var fs=require('fs');
  var array=fs.readFileSync(intfile,'utf-8');
  array=array.split(',');//将array数组元素用逗号分隔开.
  return array;
  //console.log(array);
}


//写入函数
function xieru(string,outfile){
    var fs=require('fs');
    fs.writeFile(outfile,string,function(err){
      if(err){
        console.log(err);
      }//如果有错则打印错误
      else{
        console.log('ok');
      }//没有错误则返回ok并
    });
 }
 
function dyjg(inputs) {

 var arr=loadAllItems();//将商品库清单给arr数组
    var tmp='';var sum=0;
    var xssum=0;
    var crr=loadPromotions()[0].barcodes;//将参与买三送一的优惠的商品清单给crr;
    for(var i=0;i<arr.length;i++)//遍历商品库
    {  
        arr[i].count=0;//为arr添加个数
        arr[i].discount=0;//为arr添加优惠个数
        for(var j=0;j<inputs.length;j++)
        {
            if(inputs[j].indexOf('-')!=-1)//判断购物清单是否有-
            {
                if(arr[i].barcode==inputs[j].substring(0,10))
                //如果有则截取购物清单0-10的字符串判断是否为库存商品;
                {
                   arr[i].count=parseInt(inputs[j][inputs[j].length-1]); 
                }//库存商品的数量为-后的数字
            }else  if(arr[i].barcode==inputs[j])
            {
                arr[i].count++;
               //没有则直接个数加一
            }
        }
     }  
         for(var i=0;i<arr.length;i++)
        { //判断商品是否为促销商品
            for(var k=0;k<crr.length;k++)
            {
               if(arr[i].barcode==crr[k])
                {
                   xssum=Math.floor(arr[i].count/3);//促销个数
                    if(xssum>=1){
                      arr[i].discount=xssum;
                    }
                }
           
            }
        if(arr[i].count!=0 )
           {
               //alert(xssum);
               var num=arr[i].price*(arr[i].count-arr[i].discount);
               tmp+='名称:'+arr[i].name+',数量:'+arr[i].count+arr[i].unit+
                   ',单价:'+arr[i].price.toFixed(2)+'(元),小计:'+num.toFixed(2)+'(元)\n';   
               sum+=num;//应付价格
           } 
        }
       var pir='';//优惠字符串
       var js=0;//优惠价格
     for(var i=0;i<arr.length;i++)
     {    
         if(arr[i].count>=3)
         {
            
            pir+='名称:'+arr[i].name+',数量:'+arr[i].discount+arr[i].unit+'\n';
            js+=arr[i].price*arr[i].discount; 
         }
     }  
    
      
     var bbl='***<没钱赚商店>购物清单***'+'\n'+'打印时间:'+'\n----------------------'+'\n'+tmp+'----------------------\n挥泪赠送商品:\n'+pir+'----------------------\n'+
                '总计:'+sum.toFixed(2)+'(元)\n'+'节省:'+js.toFixed(2)+'(元)\n**********************';
                return bbl;
      
}




  function loadAllItems() {//商品库
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
  }

  function loadPromotions() {//优惠商品列表
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
  }
