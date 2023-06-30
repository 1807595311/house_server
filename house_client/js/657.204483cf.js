"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[657],{9745:function(e,l,a){a.d(l,{Z:function(){return r}});var d=function(){var e=this,l=e._self._c;return l("div",[l("Cascader",{attrs:{value:e.value,data:e.data3,placeholder:e.placeholder,"render-format":e.format},on:{"on-change":e.change}})],1)},c=[],o=a(704),t={name:"ClientAddressSelect",props:{placeholder:{type:String,default:"请选择所在城市"},value:{type:Array}},data(){return{data3:[]}},created(){this.data3=o.map((e=>({code:e.code,value:e.label,label:e.label,children:e.children.map((e=>({code:e.code,label:e.label,value:e.label})))})))},methods:{format(e,l){const a=e.length-1,d=l[a]||!1;return d&&d.code,e[a]},change(e){this.$emit("getAddress",e[1])}}},v=t,b=a(1001),i=(0,b.Z)(v,d,c,!1,null,"64b68f86",null),r=i.exports},3955:function(e,l,a){a.r(l),a.d(l,{default:function(){return h}});var d=function(){var e=this,l=e._self._c;return l("div",{staticClass:"releaseDynamics"},[l("div",{staticClass:"form"},[l("Form",{ref:"formValidate",attrs:{model:e.formValidate,rules:e.ruleValidate,"label-width":80}},[l("Form-item",{staticStyle:{width:"500px"},attrs:{label:"标题",prop:"title"}},[l("Input",{attrs:{size:"large",placeholder:"标题(2-30字)"},model:{value:e.formValidate.title,callback:function(l){e.$set(e.formValidate,"title",l)},expression:"formValidate.title"}})],1),l("Form-item",{attrs:{label:"标签"}},e._l(e.tagList,(function(a,d){return l("Checkbox",{key:d,model:{value:a.check,callback:function(l){e.$set(a,"check",l)},expression:"v.check"}},[e._v(e._s(a.title))])})),1),l("Form-item",{staticStyle:{width:"300px"},attrs:{label:"城市",prop:"city"}},[l("Address",{attrs:{value:e.findCity(e.formValidate.city)},on:{getAddress:l=>e.formValidate.city=l}})],1),l("Form-item",{attrs:{label:"风格"}},[l("Select",{staticStyle:{width:"200px"},model:{value:e.styleId,callback:function(l){e.styleId=l},expression:"styleId"}},e._l(e.styleList,(function(a){return l("Option",{key:a.id,attrs:{value:a.id}},[e._v(e._s(a.name))])})),1)],1),l("Form-item",{attrs:{label:"封面",prop:"cover"}},[l("UploadHeadImg",{attrs:{imgUrl:e.editData.cover},on:{getFormdata:l=>e.formValidate.cover=l}})],1)],1)],1),l("div",{staticClass:"markdown"},[l("mavon-editor",{ref:"md",attrs:{toolbars:e.toolbars},on:{fullScreen:e.fullScreen,imgAdd:e.imgAdd,imgDel:e.imgDel,change:e.changeData},model:{value:e.content,callback:function(l){e.content=l},expression:"content"}})],1),l("div",{staticClass:"commit-box"},[l("Button",{attrs:{type:"primary",disabled:""==e.content,long:""},on:{click:e.releaseDynamics}},[e._v("发布动态")])],1)])},c=[],o=(a(1703),a(8060)),t=a(9745),v=a(704),b=a(5756),i={name:"ClientReleaseDynamics",components:{UploadHeadImg:o.Z,Address:t.Z},data(){return{formValidate:{title:"",cover:null,city:""},ruleValidate:{title:[{required:!0,validator:this.vTitle,trigger:"blur"}],city:[{required:!0,message:"请选择城市",trigger:"change"}]},content:"",toolbars:{bold:!0,italic:!1,header:!0,underline:!1,strikethrough:!1,mark:!1,superscript:!1,subscript:!1,quote:!1,ol:!0,ul:!1,link:!1,imagelink:!0,code:!1,ishljs:!0,table:!1,fullscreen:!0,readmodel:!1,htmlcode:!1,help:!1,undo:!0,redo:!0,trash:!0,save:!1,navigation:!1,alignleft:!0,aligncenter:!0,alignright:!1,subfield:!1,preview:!0},showContent:"",tagList:[{title:"卧室",check:!1},{title:"客厅",check:!1},{title:"书房",check:!1},{title:"厨房",check:!1},{title:"餐厅",check:!1},{title:"玄关",check:!1},{title:"阳台",check:!1},{title:"儿童房",check:!1},{title:"卫生间",check:!1}],editData:{},contentMD:"",dynamicId:null,styleList:[],styleId:1,city:"",markdownText:""}},created(){this.dynamicId=this.$route.params.id,this.getStyleList(),this.dynamicId&&this.getDynamic()},mounted(){},methods:{vTitle(e,l,a){l.length>30||l.length<2?a(new Error("标题2-30字之间")):(0,b.o)(l)?a(new Error("标题存在敏感词")):a()},async getDynamic(){try{let e=await this.$http.post("/client/dynamic_edit_detail",{id:this.dynamicId}),l=e.data.data;this.formValidate.title=l.title,this.formValidate.city=l.city,this.contentMD=l.content_md,this.content=l.content_md,this.styleId=l.style,this.editData=l,this.tagList.forEach((e=>{-1!=l.tags.indexOf(e.title)&&(e.check=!0)}))}catch(e){}},async getStyleList(){let e=await this.$http.get("/client/find_style_list");this.styleList=e.data.data},handleReset(e){this.$refs[e].resetFields()},getFormdata(e){this.formValidate.cover=e},changeData(e,l){if(this.showContent=l,this.markdownText=e.replace(/[^\u4E00-\u9FA5]/g,""),(0,b.o)(this.markdownText))return this.$Message.error("动态内容存在敏感词...")},async testResDy(){let e=await this.$http.post("/testResDy",{data:this.showContent});console.log(e)},releaseDynamics(){this.$refs["formValidate"].validate((async e=>{if((0,b.o)(this.markdownText))return this.$Message.error("动态内容存在敏感词...");if(e){if(""==this.showContent)return this.$Message.error("请先编辑动态内容");if(!this.formValidate.cover&&!this.dynamicId)return this.$Message.error("请上传封面");let e=this.tagList.map((e=>!0===e.check?e.title:null)).filter((e=>e)).join(",");this.contentMD=this.$refs.md.d_value;let l={id:this.dynamicId,title:this.formValidate.title,contentHTML:this.showContent,contentMD:this.contentMD,tags:e,city:this.formValidate.city};const a=new FormData;a.append("file",this.formValidate.cover),a.append("info",JSON.stringify(l));let d=null;d=this.dynamicId?await this.$http.post("/client/edit_dynamic",a):await this.$http.post("/client/release_dynamics",a),0===d.data.status&&setTimeout((()=>{this.$router.go(-1)}),600)}else this.$Message.error("请填写完整信息!")}))},imgAdd(e,l){var a=this,d=new FormData;d.append("file",l),this.$http.upload("/upload",d).then((l=>{if(200===l.status){var d=l.data.data[0].url;a.$refs.md.$img2Url(e,d)}}))},findCity(e){let l=null,a=null;for(let d=0;d<v.length;d++){let c=v[d].children.filter((l=>l.label==e));if(c.length>0){l=v[d].label,a=c[0].label;break}}return[l,a]},imgDel(e){},fullScreen(e){}}},r=i,n=a(1001),s=(0,n.Z)(r,d,c,!1,null,"3d70d880",null),h=s.exports},704:function(e){e.exports=JSON.parse('[{"label":"北京","level":"1","code":"1100","children":[{"label":"北京","level":"1","code":"1100"}]},{"label":"天津","level":"1","code":"1200","children":[{"label":"天津","level":"1","code":"1200"}]},{"label":"河北","level":"1","code":"1300","children":[{"label":"石家庄","level":"2","code":"1301"},{"label":"唐山","level":"3","code":"1302"},{"label":"秦皇岛","level":"3","code":"1303"},{"label":"邯郸","level":"3","code":"1304"},{"label":"邢台","level":"3","code":"1305"},{"label":"保定","level":"3","code":"1306"},{"label":"张家口","level":"3","code":"1307"},{"label":"承德","level":"3","code":"1308"},{"label":"沧州","level":"3","code":"1309"},{"label":"廊坊","level":"3","code":"1310"},{"label":"衡水","level":"3","code":"1311"}]},{"label":"山西","level":"1","code":"1400","children":[{"label":"太原","level":"2","code":"1401"},{"label":"大同","level":"3","code":"1402"},{"label":"阳泉","level":"3","code":"1403"},{"label":"长治","level":"3","code":"1404"},{"label":"晋城","level":"3","code":"1405"},{"label":"朔州","level":"3","code":"1406"},{"label":"晋中","level":"3","code":"1407"},{"label":"运城","level":"3","code":"1408"},{"label":"忻州","level":"3","code":"1409"},{"label":"临汾","level":"3","code":"1410"},{"label":"吕梁","level":"3","code":"1411"}]},{"label":"内蒙古","level":"1","code":"1500","children":[{"label":"呼和浩特","level":"2","code":"1501"},{"label":"包头","level":"3","code":"1502"},{"label":"乌海","level":"3","code":"1503"},{"label":"赤峰","level":"3","code":"1504"},{"label":"通辽","level":"3","code":"1505"},{"label":"鄂尔多斯","level":"3","code":"1506"},{"label":"呼伦贝尔","level":"3","code":"1507"},{"label":"巴彦淖尔","level":"3","code":"1508"},{"label":"乌兰察布","level":"3","code":"1509"},{"label":"兴安盟","level":"3","code":"1522"},{"label":"锡林郭勒盟","level":"3","code":"1525"},{"label":"阿拉善盟","level":"3","code":"1529"}]},{"label":"辽宁","level":"1","code":"2100","children":[{"label":"沈阳","level":"2","code":"2101"},{"label":"大连","level":"3","code":"2102"},{"label":"鞍山","level":"3","code":"2103"},{"label":"抚顺","level":"3","code":"2104"},{"label":"本溪","level":"3","code":"2105"},{"label":"丹东","level":"3","code":"2106"},{"label":"锦州","level":"3","code":"2107"},{"label":"营口","level":"3","code":"2108"},{"label":"阜新","level":"3","code":"2109"},{"label":"辽阳","level":"3","code":"2110"},{"label":"盘锦","level":"3","code":"2111"},{"label":"铁岭","level":"3","code":"2112"},{"label":"朝阳","level":"3","code":"2113"},{"label":"葫芦岛","level":"3","code":"2114"}]},{"label":"吉林","level":"1","code":"2200","children":[{"label":"长春","level":"2","code":"2201"},{"label":"吉林","level":"3","code":"2202"},{"label":"四平","level":"3","code":"2203"},{"label":"辽源","level":"3","code":"2204"},{"label":"通化","level":"3","code":"2205"},{"label":"白山","level":"3","code":"2206"},{"label":"松原","level":"3","code":"2207"},{"label":"白城","level":"3","code":"2208"},{"label":"延边","level":"3","code":"2224"}]},{"label":"黑龙江","level":"1","code":"2300","children":[{"label":"哈尔滨","level":"2","code":"2301"},{"label":"齐齐哈尔","level":"3","code":"2302"},{"label":"鸡西","level":"3","code":"2303"},{"label":"鹤岗","level":"3","code":"2304"},{"label":"双鸭山","level":"3","code":"2305"},{"label":"大庆","level":"3","code":"2306"},{"label":"伊春","level":"3","code":"2307"},{"label":"佳木斯","level":"3","code":"2308"},{"label":"七台河","level":"3","code":"2309"},{"label":"牡丹江","level":"3","code":"2310"},{"label":"黑河","level":"3","code":"2311"},{"label":"绥化","level":"3","code":"2312"},{"label":"大兴安岭","level":"3","code":"2327"}]},{"label":"上海","level":"1","code":"3100","children":[{"label":"上海","level":"1","code":"3100"}]},{"label":"江苏","level":"1","code":"3200","children":[{"label":"南京","level":"2","code":"3201"},{"label":"无锡","level":"3","code":"3202"},{"label":"徐州","level":"3","code":"3203"},{"label":"常州","level":"3","code":"3204"},{"label":"苏州","level":"3","code":"3205"},{"label":"南通","level":"3","code":"3206"},{"label":"连云港","level":"3","code":"3207"},{"label":"淮安","level":"3","code":"3208"},{"label":"盐城","level":"3","code":"3209"},{"label":"扬州","level":"3","code":"3210"},{"label":"镇江","level":"3","code":"3211"},{"label":"泰州","level":"3","code":"3212"},{"label":"宿迁","level":"3","code":"3213"}]},{"label":"浙江","level":"1","code":"3300","children":[{"label":"杭州","level":"2","code":"3301"},{"label":"宁波","level":"3","code":"3302"},{"label":"温州","level":"3","code":"3303"},{"label":"嘉兴","level":"3","code":"3304"},{"label":"湖州","level":"3","code":"3305"},{"label":"绍兴","level":"3","code":"3306"},{"label":"金华","level":"3","code":"3307"},{"label":"衢州","level":"3","code":"3308"},{"label":"舟山","level":"3","code":"3309"},{"label":"台州","level":"3","code":"3310"},{"label":"丽水","level":"3","code":"3311"}]},{"label":"安徽","level":"1","code":"3400","children":[{"label":"合肥","level":"2","code":"3401"},{"label":"芜湖","level":"3","code":"3402"},{"label":"蚌埠","level":"3","code":"3403"},{"label":"淮南","level":"3","code":"3404"},{"label":"马鞍山","level":"3","code":"3405"},{"label":"淮北","level":"3","code":"3406"},{"label":"铜陵","level":"3","code":"3407"},{"label":"安庆","level":"3","code":"3408"},{"label":"黄山","level":"3","code":"3410"},{"label":"滁州","level":"3","code":"3411"},{"label":"阜阳","level":"3","code":"3412"},{"label":"宿州","level":"3","code":"3413"},{"label":"巢湖","level":"3","code":"3414"},{"label":"六安","level":"3","code":"3415"},{"label":"亳州","level":"3","code":"3416"},{"label":"池州","level":"3","code":"3417"},{"label":"宣城","level":"3","code":"3418"}]},{"label":"福建","level":"1","code":"3500","children":[{"label":"福州","level":"2","code":"3501"},{"label":"厦门","level":"3","code":"3502"},{"label":"莆田","level":"3","code":"3503"},{"label":"三明","level":"3","code":"3504"},{"label":"泉州","level":"3","code":"3505"},{"label":"漳州","level":"3","code":"3506"},{"label":"南平","level":"3","code":"3507"},{"label":"龙岩","level":"3","code":"3508"},{"label":"宁德","level":"3","code":"3509"}]},{"label":"江西","level":"1","code":"3600","children":[{"label":"南昌","level":"2","code":"3601"},{"label":"景德镇","level":"3","code":"3602"},{"label":"萍乡","level":"3","code":"3603"},{"label":"九江","level":"3","code":"3604"},{"label":"新余","level":"3","code":"3605"},{"label":"鹰潭","level":"3","code":"3606"},{"label":"赣州","level":"3","code":"3607"},{"label":"吉安","level":"3","code":"3608"},{"label":"宜春","level":"3","code":"3609"},{"label":"抚州","level":"3","code":"3610"},{"label":"上饶","level":"3","code":"3611"}]},{"label":"山东","level":"1","code":"3700","children":[{"label":"济南","level":"2","code":"3701"},{"label":"青岛","level":"3","code":"3702"},{"label":"淄博","level":"3","code":"3703"},{"label":"枣庄","level":"3","code":"3704"},{"label":"东营","level":"3","code":"3705"},{"label":"烟台","level":"3","code":"3706"},{"label":"潍坊","level":"3","code":"3707"},{"label":"济宁","level":"3","code":"3708"},{"label":"泰安","level":"3","code":"3709"},{"label":"威海","level":"3","code":"3710"},{"label":"日照","level":"3","code":"3711"},{"label":"莱芜","level":"3","code":"3712"},{"label":"临沂","level":"3","code":"3713"},{"label":"德州","level":"3","code":"3714"},{"label":"聊城","level":"3","code":"3715"},{"label":"滨州","level":"3","code":"3716"},{"label":"菏泽","level":"3","code":"3717"}]},{"label":"河南","level":"1","code":"4100","children":[{"label":"郑州","level":"2","code":"4101"},{"label":"开封","level":"3","code":"4102"},{"label":"洛阳","level":"3","code":"4103"},{"label":"平顶山","level":"3","code":"4104"},{"label":"安阳","level":"3","code":"4105"},{"label":"鹤壁","level":"3","code":"4106"},{"label":"新乡","level":"3","code":"4107"},{"label":"焦作","level":"3","code":"4108"},{"label":"濮阳","level":"3","code":"4109"},{"label":"许昌","level":"3","code":"4110"},{"label":"漯河","level":"3","code":"4111"},{"label":"三门峡","level":"3","code":"4112"},{"label":"南阳","level":"3","code":"4113"},{"label":"商丘","level":"3","code":"4114"},{"label":"信阳","level":"3","code":"4115"},{"label":"周口","level":"3","code":"4116"},{"label":"驻马店","level":"3","code":"4117"}]},{"label":"湖北","level":"1","code":"4200","children":[{"label":"武汉","level":"2","code":"4201"},{"label":"黄石","level":"3","code":"4202"},{"label":"十堰","level":"3","code":"4203"},{"label":"宜昌","level":"3","code":"4205"},{"label":"襄樊","level":"3","code":"4206"},{"label":"鄂州","level":"3","code":"4207"},{"label":"荆门","level":"3","code":"4208"},{"label":"孝感","level":"3","code":"4209"},{"label":"荆州","level":"3","code":"4210"},{"label":"黄冈","level":"3","code":"4211"},{"label":"咸宁","level":"3","code":"4212"},{"label":"随州","level":"3","code":"4213"},{"label":"恩施","level":"3","code":"4228"}]},{"label":"湖南","level":"1","code":"4300","children":[{"label":"长沙","level":"2","code":"4301"},{"label":"株洲","level":"3","code":"4302"},{"label":"湘潭","level":"3","code":"4303"},{"label":"衡阳","level":"3","code":"4304"},{"label":"邵阳","level":"3","code":"4305"},{"label":"岳阳","level":"3","code":"4306"},{"label":"常德","level":"3","code":"4307"},{"label":"张家界","level":"3","code":"4308"},{"label":"益阳","level":"3","code":"4309"},{"label":"郴州","level":"3","code":"4310"},{"label":"永州","level":"3","code":"4311"},{"label":"怀化","level":"3","code":"4312"},{"label":"娄底","level":"3","code":"4313"},{"label":"湘西","level":"3","code":"4331"}]},{"label":"广东","level":"1","code":"4400","children":[{"label":"广州","level":"2","code":"4401"},{"label":"韶关","level":"3","code":"4402"},{"label":"深圳","level":"3","code":"4403"},{"label":"珠海","level":"3","code":"4404"},{"label":"汕头","level":"3","code":"4405"},{"label":"佛山","level":"3","code":"4406"},{"label":"江门","level":"3","code":"4407"},{"label":"湛江","level":"3","code":"4408"},{"label":"茂名","level":"3","code":"4409"},{"label":"肇庆","level":"3","code":"4412"},{"label":"惠州","level":"3","code":"4413"},{"label":"梅州","level":"3","code":"4414"},{"label":"汕尾","level":"3","code":"4415"},{"label":"河源","level":"3","code":"4416"},{"label":"阳江","level":"3","code":"4417"},{"label":"清远","level":"3","code":"4418"},{"label":"东莞","level":"3","code":"4419"},{"label":"中山","level":"3","code":"4420"},{"label":"潮州","level":"3","code":"4451"},{"label":"揭阳","level":"3","code":"4452"},{"label":"云浮","level":"3","code":"4453"}]},{"label":"广西","level":"1","code":"4500","children":[{"label":"南宁","level":"2","code":"4501"},{"label":"柳州","level":"3","code":"4502"},{"label":"桂林","level":"3","code":"4503"},{"label":"梧州","level":"3","code":"4504"},{"label":"北海","level":"3","code":"4505"},{"label":"防城港","level":"3","code":"4506"},{"label":"钦州","level":"3","code":"4507"},{"label":"贵港","level":"3","code":"4508"},{"label":"玉林","level":"3","code":"4509"},{"label":"百色","level":"3","code":"4510"},{"label":"贺州","level":"3","code":"4511"},{"label":"河池","level":"3","code":"4512"},{"label":"来宾","level":"3","code":"4513"},{"label":"崇左","level":"3","code":"4514"}]},{"label":"海南","level":"1","code":"4600","children":[{"label":"海口","level":"2","code":"4601"},{"label":"三亚","level":"3","code":"4602"}]},{"label":"重庆","level":"1","code":"5000","children":[{"label":"重庆","level":"1","code":"5000"}]},{"label":"四川","level":"1","code":"5100","children":[{"label":"成都","level":"2","code":"5101"},{"label":"自贡","level":"3","code":"5103"},{"label":"攀枝花","level":"3","code":"5104"},{"label":"泸州","level":"3","code":"5105"},{"label":"德阳","level":"3","code":"5106"},{"label":"绵阳","level":"3","code":"5107"},{"label":"广元","level":"3","code":"5108"},{"label":"遂宁","level":"3","code":"5109"},{"label":"内江","level":"3","code":"5110"},{"label":"乐山","level":"3","code":"5111"},{"label":"南充","level":"3","code":"5113"},{"label":"眉山","level":"3","code":"5114"},{"label":"宜宾","level":"3","code":"5115"},{"label":"广安","level":"3","code":"5116"},{"label":"达州","level":"3","code":"5117"},{"label":"雅安","level":"3","code":"5118"},{"label":"巴中","level":"3","code":"5119"},{"label":"资阳","level":"3","code":"5120"},{"label":"阿坝","level":"3","code":"5132"},{"label":"甘孜","level":"3","code":"5133"},{"label":"凉山","level":"3","code":"5134"}]},{"label":"贵州","level":"1","code":"5200","children":[{"label":"贵阳","level":"2","code":"5201"},{"label":"六盘水","level":"3","code":"5202"},{"label":"遵义","level":"3","code":"5203"},{"label":"安顺","level":"3","code":"5204"},{"label":"铜仁","level":"3","code":"5222"},{"label":"黔西南","level":"3","code":"5223"},{"label":"毕节","level":"3","code":"5224"},{"label":"黔东南","level":"3","code":"5226"},{"label":"黔南","level":"3","code":"5227"}]},{"label":"云南","level":"1","code":"5300","children":[{"label":"昆明","level":"2","code":"5301"},{"label":"曲靖","level":"3","code":"5303"},{"label":"玉溪","level":"3","code":"5304"},{"label":"保山","level":"3","code":"5305"},{"label":"昭通","level":"3","code":"5306"},{"label":"丽江","level":"3","code":"5307"},{"label":"普洱","level":"3","code":"5308"},{"label":"临沧","level":"3","code":"5309"},{"label":"楚雄","level":"3","code":"5323"},{"label":"红河","level":"3","code":"5325"},{"label":"文山","level":"3","code":"5326"},{"label":"西双版纳","level":"3","code":"5328"},{"label":"大理","level":"3","code":"5329"},{"label":"德宏","level":"3","code":"5331"},{"label":"怒江","level":"3","code":"5333"},{"label":"迪庆","level":"3","code":"5334"}]},{"label":"西藏","level":"1","code":"5400","children":[{"label":"拉萨","level":"2","code":"5401"},{"label":"昌都","level":"3","code":"5421"},{"label":"山南","level":"3","code":"5422"},{"label":"日喀则","level":"3","code":"5423"},{"label":"那曲","level":"3","code":"5424"},{"label":"阿里","level":"3","code":"5425"},{"label":"林芝","level":"3","code":"5426"}]},{"label":"陕西","level":"1","code":"6100","children":[{"label":"西安","level":"2","code":"6101"},{"label":"铜川","level":"3","code":"6102"},{"label":"宝鸡","level":"3","code":"6103"},{"label":"咸阳","level":"3","code":"6104"},{"label":"渭南","level":"3","code":"6105"},{"label":"延安","level":"3","code":"6106"},{"label":"汉中","level":"3","code":"6107"},{"label":"榆林","level":"3","code":"6108"},{"label":"安康","level":"3","code":"6109"},{"label":"商洛","level":"3","code":"6110"}]},{"label":"甘肃","level":"1","code":"6200","children":[{"label":"兰州","level":"2","code":"6201"},{"label":"嘉峪关","level":"3","code":"6202"},{"label":"金昌","level":"3","code":"6203"},{"label":"白银","level":"3","code":"6204"},{"label":"天水","level":"3","code":"6205"},{"label":"武威","level":"3","code":"6206"},{"label":"张掖","level":"3","code":"6207"},{"label":"平凉","level":"3","code":"6208"},{"label":"酒泉","level":"3","code":"6209"},{"label":"庆阳","level":"3","code":"6210"},{"label":"定西","level":"3","code":"6211"},{"label":"陇南","level":"3","code":"6212"},{"label":"临夏","level":"3","code":"6229"},{"label":"甘南","level":"3","code":"6230"}]},{"label":"青海","level":"1","code":"6300","children":[{"label":"西宁","level":"2","code":"6301"},{"label":"海东","level":"3","code":"6321"},{"label":"海北","level":"3","code":"6322"},{"label":"黄南","level":"3","code":"6323"},{"label":"海南","level":"3","code":"6325"},{"label":"果洛","level":"3","code":"6326"},{"label":"玉树","level":"3","code":"6327"},{"label":"海西","level":"3","code":"6328"}]},{"label":"宁夏","level":"1","code":"6400","children":[{"label":"银川","level":"2","code":"6401"},{"label":"石嘴山","level":"3","code":"6402"},{"label":"吴忠","level":"3","code":"6403"},{"label":"固原","level":"3","code":"6404"},{"label":"中卫","level":"3","code":"6405"}]},{"label":"新疆","level":"1","code":"6500","children":[{"label":"乌鲁木齐","level":"2","code":"6501"},{"label":"克拉玛依","level":"3","code":"6502"},{"label":"吐鲁番","level":"3","code":"6521"},{"label":"哈密","level":"3","code":"6522"},{"label":"昌吉","level":"3","code":"6523"},{"label":"博尔塔拉","level":"3","code":"6527"},{"label":"巴音郭楞","level":"3","code":"6528"},{"label":"阿克苏","level":"3","code":"6529"},{"label":"克孜勒苏","level":"3","code":"6530"},{"label":"喀什","level":"3","code":"6531"},{"label":"和田","level":"3","code":"6532"},{"label":"伊犁","level":"3","code":"6540"},{"label":"塔城","level":"3","code":"6542"},{"label":"阿勒泰","level":"3","code":"6543"}]},{"label":"台湾","level":"1","code":"7100","children":[{"label":"台湾","level":"1","code":"7100"}]},{"label":"香港","level":"1","code":"8100","children":[{"label":"香港","level":"1","code":"8100"}]},{"label":"澳门","level":"1","code":"8200","children":[{"label":"澳门","level":"1","code":"8200"}]}]')}}]);
//# sourceMappingURL=657.204483cf.js.map