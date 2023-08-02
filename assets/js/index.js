function ManageIndexJs(){

    this.mainSetup = () =>{

        $(".menu-item").click((event)=>{
            console.log(event.target);
            if(event.target.classList.contains('menu-item')){
                this.loadPage(event.target.dataset.page)
            }else{
                this.loadPage(event.target.closest('.menu-item').dataset.page)
            }
            // console.log($(this).data('page'));
            // this.loadPage($(this).data('page'))
        });

        $(".main-menu-item").click(function(){
            $(".menu-item").removeClass('active');
            $(this).addClass('active');
        })

        $(".facotry-reset-button").click(()=>{
            $(".menu-item").removeClass('active');
            $(".facotry-reset-button").addClass('facotry-reset-active')
        })

        $(".menu-item")[0].click();
    }


    this.loadPage = (page) =>{
        $(".load-color-picker").css('display','none');
        $(".main-content-wrapper").css('display','block');
        $(".config-page").css('display','none')
        setTimeout(()=>{
            renderColors()
            $(`.${page}`).fadeIn();

        },1)
    }
    
    this.mainSetup();
}
var manageindexjs = new ManageIndexJs()


// Manage Theme Configration
function ManageThemeConfigration(){

    this.mainSetup = () =>{
        setInitialColors();
        renderColors()
        $(".edit-color").click(function(){
            localStorage.setItem('edit',$(this).data('edit'))
            $(".load-color-picker").load('./assets/src/color-picker-page.html');
            $(".load-color-picker").css('display','block')
            $(".main-content-wrapper").css('display','none')
        })

        $(".toggle-button").click(function(){
            var parent = $(this).parent().parent().parent();
            parent.find('.toggle-button').removeClass('current')
            $(this).addClass('current');

            switch($(this).data('color')){
                case "white":
                    localStorage.setItem(parent.data('color_name'),"#ffffff");
                    parent.parent().prev().find('.color-box').removeClass('black')
                    parent.parent().prev().find('.color-box').addClass('white')
                    break;
                case "black":
                    localStorage.setItem(parent.data('color_name'),"#000000");
                    parent.parent().prev().find('.color-box').removeClass('white');
                    parent.parent().prev().find('.color-box').addClass('black');
                    break;
            }
            
        })
    }
    
    this.mainSetup();   
}
var managethemeconfigration = new ManageThemeConfigration();
// End  Manage Theme Configration

// Manage Upload Theme Configration
function ManageUploadThemeConfig(){
    this.mainSetup = () =>{
        $("#open-upload").click(()=>{
            $("#jsonFileInput").click();
        })

        $("#jsonFileInput").on('change', this.handleFileSelect);
    }

    this.handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();

        reader.onload = (event) => {
            const contents = event.target.result;
            const jsonData = JSON.parse(contents);

            this.displayData(jsonData);
        };

        reader.readAsText(file);
    }

    this.displayData = (data) =>{
        for(let key in data){
            localStorage.setItem(key,data[key]);
        }

        renderColors()
    }

    this.mainSetup();
}   

var manageuploadthemeconfig = new ManageUploadThemeConfig();
// End Manage Upload Theme Configration