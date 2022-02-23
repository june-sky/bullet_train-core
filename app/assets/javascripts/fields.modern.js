import{Controller as e}from"stimulus";import"@simonwep/pickr/dist/themes/monolith.min.css";import t from"@simonwep/pickr";import"daterangepicker";import i from"intl-tel-input";import a from"select2";import r from"tributejs";function n(e){var t=(e.match(/^(?:\.\/)?(.+)(?:[_-]controller\..+?)$/)||[])[1];if(t)return t.replace(/_/g,"-").replace(/\//g,"--")}class s extends e{clickShadowField(e){e.preventDefault(),this.shadowFieldTarget.click()}}s.targets=["shadowField"];class l extends e{pickImageAndUpload(e){e.preventDefault();var t=["local","url","camera"];this.hasGoogleApiKeyValue&&t.push("image_search");var i={cloud_name:this.cloudNameValue,apiKey:this.apiKeyValue,upload_preset:this.uploadPresetValue,upload_signature:this.getCloudinarySignature.bind(this),multiple:!1,sources:this.hasSourcesValue?this.sourcesValue.split(","):t,search_by_rights:!this.hasSearchByRightsValue||!1!==this.searchByRightsValue};this.hasGoogleApiKeyValue&&(i.google_api_key=this.googleApiKeyValue),cloudinary.openUploadWidget(i,this.handleWidgetResponse.bind(this))}clearImage(e){e.preventDefault(),this.hiddenFieldTarget.value=null,this.removeThumbnail()}getCloudinarySignature(e,t){$.ajax({url:this.signaturesUrlValue,type:"GET",dataType:"text",data:{data:t},complete:function(){console.log("complete")},success:function(t,i,a){e(t)},error:function(e,t,i){console.log(e,t,i)}})}handleWidgetResponse(e,t){if(!e&&t&&"success"===t.event){const e=t.info;this.hiddenFieldTarget.value=e.public_id,this.removeThumbnail(),this.addThumbnail(this.urlFormatValue.replace("CLOUDINARY_ID",e.public_id))}}addThumbnail(e){var t=$(`<img src="${e}" width="${this.widthValue}" height="${this.heightValue}" data-${this.identifier}-target="thumbnail" />`);$(this.uploadButtonTarget).prepend(t),this.uploadButtonTarget.classList.add(this.thumbnailShownClass)}removeThumbnail(){this.hasThumbnailTarget&&(this.uploadButtonTarget.removeChild(this.thumbnailTarget),this.uploadButtonTarget.classList.remove(this.thumbnailShownClass))}}l.targets=["uploadButton","hiddenField","thumbnail"],l.values={signaturesUrl:String,height:Number,width:Number,cloudName:String,apiKey:String,googleApiKey:String,urlFormat:String,sources:String,searchByRights:Boolean},l.classes=["thumbnailShown"];class o extends e{connect(){this.initPluginInstance(),this.colorOptions=$(this.colorOptionsTarget).find("button").map(function(e,t){return $(t).attr("data-color")}).get()}disconnect(){this.teardownPluginInstance()}pickColor(e){e.preventDefault();const t=e.target,i=t.dataset.color;$(this.colorInputTarget).val(i),$(this.colorPickerValueTarget).val(i),$(this.userSelectedColorTarget).data("color",i),$(".button-color").removeClass("ring-2 ring-offset-2"),this.pickr.setColor(i),t.classList.add("ring-2","ring-offset-2")}pickRandomColor(e){e.preventDefault();const t=Math.floor(256*Math.random()),i=Math.floor(256*Math.random()),a=Math.floor(256*Math.random());this.pickr.setColor(`rgb ${t} ${i} ${a}`);const r=this.pickr.getColor().toHEXA().toString();this.pickr.setColor(r),this.showUserSelectedColor(r)}showUserSelectedColor(e){$(this.colorInputTarget).val(e),$(this.colorPickerValueTarget).val(e),$(".button-color").removeClass("ring-2 ring-offset-2"),$(this.userSelectedColorTarget).addClass("ring-2").addClass("ring-offset-2").css("background-color",e).css("--tw-ring-color",e).attr("data-color",e).show()}unpickColor(e){e.preventDefault(),$(this.colorPickerValueTarget).val(""),$(this.colorInputTarget).val(""),$(this.userSelectedColorTarget).hide(),$(".button-color").removeClass("ring-2 ring-offset-2")}togglePickr(e){e.preventDefault()}initPluginInstance(){this.pickr=t.create({el:".btn-pickr",theme:"monolith",useAsButton:!0,default:this.initialColorValue||"#1E90FF",components:{preview:!0,hue:!0,interaction:{input:!0,save:!0}}}),this.pickr.on("save",(e,t)=>{const i=e.toHEXA().toString();this.colorOptions.includes(i)||this.showUserSelectedColor(i),this.pickr.hide()});const e=this;$('input[type="text"].pcr-result').on("keydown",function(t){"Enter"===t.key&&e.pickr.applyColor(!1)})}teardownPluginInstance(){this.pickr.destroy()}}o.targets=["colorPickerValue","colorField","colorInput","userSelectedColor","colorOptions"],o.values={initialColor:String},require("daterangepicker/daterangepicker.css");class c extends e{connect(){this.initPluginInstance()}disconnect(){this.teardownPluginInstance()}clearDate(e){e.preventDefault(),$(this.fieldTarget).val("")}applyDateToField(e,t){const i=this.includeTimeValue?"MM/DD/YYYY h:mm A":"MM/DD/YYYY";$(this.fieldTarget).val(t.startDate.format(i))}showTimeZoneButtons(e){e.preventDefault(),$(this.currentTimeZoneWrapperTarget).toggleClass("hidden"),$(this.timeZoneButtonsTarget).toggleClass("hidden")}showTimeZoneSelectWrapper(e){e.preventDefault(),$(this.timeZoneButtonsTarget).toggleClass("hidden"),this.hasTimeZoneSelectWrapperTarget&&$(this.timeZoneSelectWrapperTarget).toggleClass("hidden")}resetTimeZoneUI(e){e&&e.preventDefault(),$(this.currentTimeZoneWrapperTarget).removeClass("hidden"),$(this.timeZoneButtonsTarget).addClass("hidden"),this.hasTimeZoneSelectWrapperTarget&&$(this.timeZoneSelectWrapperTarget).addClass("hidden")}setTimeZone(e){e.preventDefault();const t=this.currentTimeZoneWrapperTarget.querySelector("a"),{value:i}=e.target.dataset;$(this.timeZoneFieldTarget).val(i),$(t).text(i),$(".time-zone-button").removeClass("button").addClass("button-alternative"),$(e.target).removeClass("button-alternative").addClass("button"),this.resetTimeZoneUI()}initPluginInstance(){if($(this.fieldTarget).daterangepicker({singleDatePicker:!0,timePicker:this.includeTimeValue,timePickerIncrement:5,autoUpdateInput:!1,locale:{cancelLabel:this.hasCancelButtonLabelValue?this.cancelButtonLabelValue:"cancel",applyLabel:this.hasApplyButtonLabelValue?this.applyButtonLabelValue:"apply",format:this.includeTimeValue?"MM/DD/YYYY h:mm A":"MM/DD/YYYY"}}),$(this.fieldTarget).on("apply.daterangepicker",this.applyDateToField.bind(this)),$(this.fieldTarget).on("cancel.daterangepicker",this.clearDate.bind(this)),this.pluginMainEl=this.fieldTarget,this.plugin=$(this.pluginMainEl).data("daterangepicker"),this.includeTimeValue&&this.hasTimeZoneSelectWrapperTarget){this.timeZoneSelect=this.timeZoneSelectWrapperTarget.querySelector("select.select2"),$(this.timeZoneSelect).select2({width:"style"});const e=this;$(this.timeZoneSelect).on("change.select2",function(t){const i=e.currentTimeZoneWrapperTarget.querySelector("a"),{value:a}=t.target;$(e.timeZoneFieldTarget).val(a),$(i).text(a);const r=$(".selected-option-time-zone-button");e.defaultTimeZonesValue.includes(a)?($(".time-zone-button").removeClass("button").addClass("button-alternative"),r.addClass("hidden").attr("hidden",!0),$(`a[data-value="${a}"`).removeClass("button-alternative").addClass("button")):($(".time-zone-button").removeClass("button").addClass("button-alternative"),r.text(a),r.attr("data-value",a).removeAttr("hidden"),r.removeClass(["hidden","button-alternative"]).addClass("button")),e.resetTimeZoneUI()})}}teardownPluginInstance(){void 0!==this.plugin&&($(this.pluginMainEl).off("apply.daterangepicker"),$(this.pluginMainEl).off("cancel.daterangepicker"),this.plugin.remove(),this.includeTimeValue&&$(this.timeZoneSelect).select2("destroy"))}}c.targets=["field","clearButton","currentTimeZoneWrapper","timeZoneButtons","timeZoneSelectWrapper","timeZoneField"],c.values={includeTime:Boolean,defaultTimeZones:Array,cancelButtonLabel:String,applyButtonLabel:String};class u extends e{connect(){const e=document.addEventListener("direct-upload:initialize",e=>{this.selectFileButtonTarget.classList.add("hidden"),this.progressBarTarget.innerText="0%",this.progressBarTarget.style.width="0%",this.progressBarTarget.setAttribute("aria-valuenow",0),this.progressBarTarget.parentNode.classList.remove("hidden")}),t=document.addEventListener("direct-upload:progress",e=>{const{progress:t}=e.detail,i=`${t.toFixed(1)}%`;this.progressBarTarget.innerText=i,this.progressBarTarget.setAttribute("aria-valuenow",t),this.progressBarTarget.style.width=i}),i=document.addEventListener("direct-upload:error",e=>{e.preventDefault();const{error:t}=e.detail;this.progressBarTarget.innerText=t});this.uploadListeners={"direct-upload:initialize":e,"direct-upload:progress":t,"direct-upload:error":i}}disconnect(){for(const e in this.uploadListeners)document.removeEventListener(e,this.uploadListeners[e])}uploadFile(){this.fileFieldTarget.click()}removeFile(){this.hasDownloadFileButtonTarget&&this.downloadFileButtonTarget.classList.add("hidden"),this.removeFileButtonTarget.classList.add("hidden"),this.removeFileFlagTarget.value=!0}handleFileSelected(){const e=this.selectFileButtonTarget.querySelector("span"),t=this.selectFileButtonTarget.querySelector("i");this.hasDownloadFileButtonTarget&&this.downloadFileButtonTarget.remove(),e.innerText="Select Another File",t.classList.remove("ti-upload"),t.classList.add("ti-check")}}u.targets=["fileField","removeFileFlag","downloadFileButton","removeFileButton","selectFileButton","progressBar"],require("intl-tel-input/build/css/intlTelInput.css");class d extends e{connect(){this.initPluginInstance()}disconnect(){this.teardownPluginInstance()}initPluginInstance(){let e={hiddenInput:this.fieldTarget.dataset.method,customContainer:"w-full"};const t=function(e){const t=document.head.querySelector('meta[name="intl_tel_input_utils_path"]');return t&&t.content}();t&&(e.utilsScript=t),this.plugin=i(this.fieldTarget,e)}teardownPluginInstance(){void 0!==this.plugin&&this.plugin.destroy()}}d.targets=["field"],require("select2/dist/css/select2.min.css");class h extends e{initialize(){this.isSelect2LoadedOnWindowJquery&&a(window.$)}get isSelect2LoadedOnWindowJquery(){return void 0!==window.$&&void 0===window.$.select2}connect(){this.isSelect2LoadedOnWindowJquery&&this.initPluginInstance()}disconnect(){this.teardownPluginInstance()}cleanupBeforeInit(){$(this.element).find(".select2-container--default").remove()}initPluginInstance(){let e={};this.enableSearchValue||(e.minimumResultsForSearch=-1),e.tags=this.acceptsNewValue,this.searchUrlValue&&(e.ajax={url:this.searchUrlValue,dataType:"json",data:function(e){return{search:e.term,page:e.page||1}}}),e.templateResult=this.formatState,e.templateSelection=this.formatState,e.width="style",this.cleanupBeforeInit(),this.pluginMainEl=this.selectTarget,$(this.pluginMainEl).select2(e)}teardownPluginInstance(){void 0!==this.pluginMainEl&&$(this.pluginMainEl).select2("destroy")}formatState(e){var t=$(e.element).attr("data-image"),i="";return t&&(i='<img src="'+t+'" /> '),$("<span>"+i+e.text+"</span>")}}h.targets=["select"],h.values={acceptsNew:Boolean,enableSearch:Boolean,searchUrl:String};const p=[[s,"fields/button_toggle_controller.js"],[l,"fields/cloudinary_image_controller.js"],[o,"fields/color_picker_controller.js"],[c,"fields/date_controller.js"],[u,"fields/file_field_controller.js"],[d,"fields/phone_controller.js"],[h,"fields/super_select_controller.js"]].map(function(e){const t=e[0];return{identifier:n(e[1]),controllerConstructor:t}});function g(){document.addEventListener("trix-initialize",function(){addEventListener("trix-focus",m),addEventListener("trix-blur",m),m(),document.querySelectorAll("trix-editor").forEach((e,t)=>{var i=e.editor,a={trigger:"@",values:JSON.parse(i.element.dataset.mentions),selectTemplate:function(e){return'<a href="'+(e=e.original).protocol+"://"+e.model+"/"+e.id+'">'+e.label+"</a>"},menuItemTemplate:function(e){return'<img src="'+e.original.photo+'" /> '+e.string},requireLeadingSpace:!0,replaceTextSuffix:""},n={trigger:"#",values:JSON.parse(i.element.dataset.topics),selectTemplate:function(e){return'<a href="'+(e=e.original).protocol+"://"+e.model+"/"+e.id+'">'+e.label+"</a>"},menuItemTemplate:function(e){return'<img src="'+e.original.photo+'" /> '+e.string},requireLeadingSpace:!0,replaceTextSuffix:""};new r({collection:[n,a]}).attach(e)})})}function m(){document.querySelectorAll("trix-editor").forEach((e,t)=>{var i=e.toolbarElement;e==document.activeElement?i.classList.add("visible"):i.contains(document.activeElement)||i.classList.remove("visible")})}require("trix/dist/trix.css"),require("trix"),require("@rails/actiontext");export{s as ButtonToggleController,l as CloudinaryImageController,o as ColorPickerController,c as DateController,u as FileFieldController,d as PhoneController,h as SuperSelectController,p as controllerDefinitions,g as trixEditor};
//# sourceMappingURL=fields.modern.js.map
