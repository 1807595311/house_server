"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[870],{4915:function(e,t,s){s.d(t,{Z:function(){return d}});var a=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"personCenterBg d_f j_c_c a_l_c"},[t("p",{staticClass:"title"},[e._v(e._s(e.title)+" "),t("span",{directives:[{name:"count",rawName:"v-count",value:e.count,expression:"count"}]})])])])},i=[],n={name:"ClientHeadBG",props:{title:{type:String,default:""},count:{type:Number,default:0}},data(){return{}},mounted(){},methods:{},directives:{count:{update(e,t){0===t.value&&(e.style.display="none"),e.innerText=`【${t.value}】`}}}},r=n,c=s(1001),l=(0,c.Z)(r,a,i,!1,null,"66a3848a",null),d=l.exports},1870:function(e,t,s){s.r(t),s.d(t,{default:function(){return v}});var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"dynamicList"},[t("HeadBG",{attrs:{title:"搜索"}}),t("div",{staticClass:"search"},[t("Input",{attrs:{size:"large",placeholder:e.searchPlaceholder},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchByKeword(e.searchValue)}},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}},[t("Select",{staticStyle:{width:"80px"},attrs:{slot:"prepend"},slot:"prepend",model:{value:e.searchType,callback:function(t){e.searchType=t},expression:"searchType"}},[t("Option",{attrs:{value:"des"}},[e._v("设计机构")]),t("Option",{attrs:{value:"ord"}},[e._v("普通用户")])],1),t("Button",{attrs:{slot:"append",icon:"ios-search"},on:{click:function(t){return e.searchByKeword(e.searchValue)}},slot:"append"})],1)],1),t("div",{staticClass:"box"},e._l(e.designList,(function(e){return t("DesignDepartment",{key:e.id,attrs:{design:e}})})),1),t("div",{staticClass:"scroll"},[e._v("已加载全部")])],1)},i=[],n=s(4915),r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"designDepartment"},[t("div",{staticClass:"container"},[t("div",{staticClass:"headimg",on:{click:e.toUserHome}},[t("img",{attrs:{src:e.design.headimg}})]),t("div",{staticClass:"nickname"},[t("p",{staticClass:"tips"},[e._v(e._s(e.design.mechanism_name))]),t("p",{staticStyle:{"white-space":"nowrap","text-overflow":"ellipsis",overflow:"hidden",width:"100%"}},[e._v(" "+e._s(e.design.nickname)+" "+e._s(e.design.mechanism_name?`| ${e.design.mechanism_name}`:"")+" ")])]),t("p",{staticClass:"establish_time"},[e.design.establish_time?t("span",[e._v("成立时间: "+e._s(e.design.establish_time))]):e._e()]),t("div",{staticClass:"address d_f j_c_c"},[e.design.city?t("span",[e._v(e._s(e.design.city))]):e._e()]),t("div",{staticClass:"introduce"},[t("div",{staticClass:"text"},[e._v(" "+e._s(e.design.introduce)+" ")])])])])},c=[],l=(s(7658),{naem:"DesignDepartment",props:{design:{type:Object}},methods:{toUserHome(){this.$router.push({path:"/user_home",query:{account_number:this.design.account_number}})}}}),d=l,o=s(1001),u=(0,o.Z)(d,r,c,!1,null,"bde9ccc4",null),h=u.exports,p={name:"ClientSearchDynamic",components:{HeadBG:n.Z,DesignDepartment:h},data(){return{designList:[],keyword:"",searchValue:"",searchType:"des",searchPlaceholder:"搜索机构(昵称/账号/机构名称)"}},created(){this.keyword=this.$route.query.keyword,this.searchValue=this.keyword,this.searchByKeword(this.keyword)},watch:{searchType(e){let t=["des","ord"],s=["搜索机构(昵称/账号/机构名称)","搜索用户(昵称/账号)"],a=t.indexOf(e);this.searchPlaceholder=s[a]}},methods:{getType(){let e=["des","ord"];return e.indexOf(this.searchType)},async searchByKeword(e){try{let t=await this.$http.get("/client/search_users",{keyword:e,type:this.getType()});return this.designList=t.data.data}catch(t){}}}},_=p,m=(0,o.Z)(_,a,i,!1,null,null,null),v=m.exports}}]);
//# sourceMappingURL=870.1778d1d5.js.map