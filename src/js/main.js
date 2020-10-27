function setNavigation() {
    var path = window.location.pathname;
    path = path.replace(/\/$/, '');
    path = decodeURIComponent(path);
    var xxx = path.split('/');
    if ($(document).width() >= 1200) {
        if (path !== '') {
            var hrefs = $('nav.navbar .nav-item a[href*="' + xxx[1] + '"]');
            $(hrefs[0]).addClass('activeclass');
            $('.activeclass').parent().css(
                "border-bottom", "solid #C74242 3px");
        }
    }
}
// MULTILANGUAGE
var jtrnsl;
function translate(toLang) {
    var str = jtrnsl.eng;
    if (toLang === "en") {
        str = jtrnsl.eng;
    } else
        if (toLang === "ru") {
            str = jtrnsl.rus;
        }
    var idcollection = $('[id]');
    for (var i = 0; i < idcollection.length; i++) {
        if (str[$(idcollection[i]).prop('id')] !== "") {
            $(idcollection[i]).text(str[$(idcollection[i]).prop('id')]);
        }
    }
}

//VALIDATION
function SingleValidation() {
    let self = this;

    if (this.id === 'phone') {
        var regex = new RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/);
        var OK = regex.test(this.value);
        if (!OK) {
            this.classList.add('is-invalid');
        } else {
            this.classList.add('is-valid');
        }
    }
    else {
        if (this.checkValidity() === false) {
            this.classList.add('is-invalid');
        } else {
            this.classList.add('is-valid');
        }
    }
    this.classList.add('was-validated');
    setTimeout(function () {

        self.classList.remove('was-validated');
        self.classList.remove('is-invalid');
        self.classList.remove('is-valid');

    }, 3000);

}


function MyValidation() {
    var inputs = document.querySelectorAll('form .form-control');
    var i;
    var result = true;
    for (i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove('was-validated');
        inputs[i].classList.remove('is-invalid');

        if (inputs[i].id === 'phone') {
            var regex = new RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/);
            var OK = regex.test(inputs[i].value);
            if (!OK) {
                result = false;
                inputs[i].classList.add('is-invalid');
            } else {
                inputs[i].classList.add('is-valid');
            }
        }
        else {
            if (inputs[i].checkValidity() === false) {
                result = false;
                inputs[i].classList.add('is-invalid');
            } else {
                inputs[i].classList.add('is-valid');
            }
        }
        inputs[i].classList.add('was-validated');
    }
    setTimeout(function () {
        var i;
        for (i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove('was-validated');
            inputs[i].classList.remove('is-invalid');
            inputs[i].classList.remove('is-valid');
        }
    }, 3000);
    return result;
}



function SubmitClick() {
    if (!$(this).hasClass('loading')) {
        $(this).addClass('loading');
        let self = this;

        if (MyValidation()) {
            setTimeout(function () {
                $(self).removeClass('loading');
                $(self).addClass('checked');
            }, 1500);

            // send email
            SendEmail();
            $('form .form-control').val('');
            $('form .form-control').removeClass('is-valid');

        }
        else {
            setTimeout(function () {
                $(self).removeClass('loading');
                $(self).addClass('failed');
            }, 1500);
        }
        setTimeout(function () {
            $(self).removeClass('checked');
            $(self).removeClass('failed');
        }, 3000);
    }
}



$(document).ready(function () {
    $.getJSON('/js/datatextj.json', function (jd) {
        jtrnsl = jd;
        var toLang = navigator.language.substr(0, 2);
        if (toLang !== 'en' && toLang !== 'ru') {
           toLang = 'en';
        }
        $("#" + toLang).change();
    }).fail(function () {
        console.log("error");
    });

    $('.internalize').on('change', function () {
        var lang = $(".internalize option:selected").val();
        translate(lang);
    });

   // $('nav.navbar .nav-item').addClass('activeclass');
    setNavigation();
    $('nav.navbar .nav-item').on('click', setNavigation);

    $('nav .navbar.navbar-expand-xl').offcanvas();


    function getBootstrapDeviceSize() {
        return $('.internalize option').find('option.d-block').first().attr('id');
    }


    $('#id24').on('click', SubmitClick);
    $('form .form-control').on('blur', SingleValidation);

});

// SCROLLER

$('.responsive').slick({
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    mobilefirst: true,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 4

            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3

            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2

            }
        },
        {
            breakpoint: 576,
            //settings: "unslick"
            settings: {
                slidesToShow: 2

            }

        }
    ]
});

$(".slick-list").mCustomScrollbar({
    axis: "x",
    theme: "my-theme",
    setWidth: "100%"
});



