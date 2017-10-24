//alert("Pop-up window");
$(document).ready(function () {
    //your code here
$addButton = $(".addItem");
$itemInput =$(".form-add input");
$itemContainer =$(".list");
$reportContainer = $(".report .container");

function validate(arg){
    if(arg.length>0) return true;
}

function findByName(name){
    return $(".need_buy").filter(function(){
        return $(this).text().replace(/[0-9]/g,'') === name;
    });
}

function reverseBuy(text,num,reverse){
    let inHtml;
    findByName(text).remove();
    if(reverse){
        inHtml="<span class=\"need_buy\"><strike>"+text+"</strike><span class=\"num_to_buy\">"+num+"</span></span>";
        $(".b_container").append(inHtml);
    }else{
        inHtml="<span class=\"need_buy\">"+text+"<span class=\"num_to_buy\">"+num+"</span></span>";
        $reportContainer.append(inHtml);
    }
}

function change_val(nleft,rleft,positive){
    let num = parseInt(nleft.text());
    if(positive){
        num+=1;
    }else{
        if(num>1){
          num-=1;
        }
    }
    nleft.text(num);
    rleft.text(num);
}

$addButton.click(function(){
    let item =$itemInput.val();
    if (validate(item)){
        let html_form = "<div class=\"item row\">\n" +
            "       <div class =\"column appelation\">"+item+"</div>\n" +
            "        <div class=\"column \"><button class=\"subtract circle\" data-tooltip=\"decrement\"><span class=\"minus icon\">–</span></button>\n" +
            "            <span class=\"num_left\">1</span>\n" +
            "            <button class=\"add circle\" data-tooltip=\"Increment \"><span class=\"plus icon\">+</span></button>\n" +
            "        </div><div class=\"column  complete\">\n" +
            "            <button class=\"bought trigger\" data-tooltip=\"Move to bought \" >Bought</button>\n" +
            "            <button class=\"delete\" data-tooltip=\"Remove \" ><span class=\"icon\">×</span></button>\n" +
            "        </div></div>"

        let html_report = "<span class=\"need_buy\">"+item+"<span class=\"num_to_buy\">1</span></span>"

       $itemContainer.append(html_form);
       $reportContainer.append(html_report);
       $itemInput.val("");
       $itemInput.focus();
    }
});

$itemContainer.on("click",".delete",function () {
    $removeItem = $(this).closest(".item");
    let text = $removeItem.children(".appelation").text();
    $removeItem.remove();
    findByName(text).remove();
});


$itemContainer.on("click",".trigger",function () {
   $(this).addClass("unbought");
   $(this).removeClass("trigger");
   $(this).text("Return");
   let item = $(this).closest(".item");
   let name = item.children(".appelation");
   let num = item.find(".num_left").text();
   let text = name.html();
   let innText = "<strike>"+name.html()+"</strike>"
   name.html(innText);
   let buttons = item.find(".circle, .delete");
   buttons.attr("disabled","true");
   buttons.css("cursor","auto");
   buttons.animate({opacity: 0}, 250);
   reverseBuy(text,num,true);
});

$itemContainer.on("click",".unbought",function(){
    $(this).removeClass("unbought");
    $(this).addClass("trigger");
    $(this).text("Bought");
    let item = $(this).closest(".item");
    let name = item.children(".appelation");
    let num = item.find(".num_left").text();
    let text = name.html();
    text=text.replace("<strike>","");
    text=text.replace("</strike>","");
    name.html(text);
    let buttons = item.find(".circle, .delete");
    buttons.removeAttr("disabled");
    buttons.css("cursor","pointer");
    buttons.animate({opacity: 1}, 250);
    reverseBuy(text,num,false);
});

$itemContainer.on("click",".add",function(){
    let nleft = $(this).siblings(".num_left");
    let name = $(this).closest(".item").children(".appelation").text();
    let rleft=findByName(name).children(".num_to_buy");
    change_val(nleft,rleft,true);
});

$itemContainer.on("click",".subtract",function(){
    let nleft = $(this).siblings(".num_left");
    let name = $(this).closest(".item").children(".appelation").text();
    let rleft=findByName(name).children(".num_to_buy");
    change_val(nleft,rleft,false);
})
});