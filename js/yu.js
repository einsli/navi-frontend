Vue.config.productionTip = false // 阻止vue启动时生成生产提示

const vm = new Vue({
    el: "#container",
    data: {
        name: "rust-web",
        guides: GudiesData(),
        sites: SitesData(),
        title: SiteTitle()
    }
})

function GudiesData() {
    // 发送请求
    const guidesData = new Array();
    ClientFetch("http://127.0.0.1:3000/groups/", (data) => {
        const resultData = JSON.parse(data);
        if(resultData.code !== 0) {
            alert(resultData.msg);
            return;
        } else {
            for(let i=0; i < resultData.data.length; i++){
                guidesData.push({
                    id: "#"+resultData.data[i]["id"],
                    name: resultData.data[i]["name"]
                })
            }
        }
    }, {
        method: 'GET'
    })
    return guidesData
}

function SiteTitle() {
    return "Rust-Web-Navi"
}

function ClientFetch(url, cb, options) {
    const xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState===4 && xmlhttp.status===200)
        {
            cb(xmlhttp.responseText);
        }
    }
    xmlhttp.open(options.method,url,true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
    return xmlhttp
}

function SitesData() {
    // 发送请求
    const sitesGroup = new Array();
    ClientFetch('http://127.0.0.1:3000/sites/', (data) => {
        const resultData = JSON.parse(data);
        if(resultData.code !== 0) {
            alert(resultData.msg);
            return;
        } else {
            // console.log("sites data", resultData["data"])
            for (let i=0; i < resultData["data"].length; i++) {
                const sitesData = new Array();
                for (let j=0; j < resultData["data"][i]["navi_sites"].length; j++) {
                    sitesData.push({
                        site_id: resultData["data"][i]["navi_sites"][j]["site_id"],
                        site_name: resultData["data"][i]["navi_sites"][j]["site_name"],
                        site_url: resultData["data"][i]["navi_sites"][j]["site_url"],
                        site_description: resultData["data"][i]["navi_sites"][j]["site_description"],
                        site_img_path: "http://127.0.0.1:3000/sites/" + resultData["data"][i]["navi_sites"][j]["site_img_path"],
                    })
                }
                sitesGroup.push({
                    group_id: resultData["data"][i]["group_id"],
                    group_name: resultData["data"][i]["group_name"],
                    navi_sites: sitesData
                })
            }
            return sitesGroup
        }
    }, {
        method: 'GET'
    })
    return sitesGroup
}
