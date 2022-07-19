/*
if (document.querySelector(".js-form")) {

    var freeInputP = 1;
    var freeInputM = 1;
    var freeInputT = 1;

    $('.js-form').each(function () {
        var thanks = $(this).find('.thanks-msg');
        var formcontent = $(this).find('.contact-you');
        var formTitle = $(this).find('.contact-form-title');
        thanks.hide();

        var checkBoxError = 1;
        var freeInput = 0;
        var errors = 1;
        var $btn = $(this).find('.js-form-submit');
        $btn.prop('disabled', true);
        var forms = $(this).find('.contact-you')['prevObject'];
        var allInput = $(this).find(':input[required]:visible');


        // функция обрезки файлика
        var checkFile = function () {
            var fileName = $('.file-name');
            // var fileLen = fileName.html($('input[type=file]').val().split('\\').pop());
            var split = $('input[type=file]').val().split('\\').pop().split('.');
            var filename = split[0];
            var extension = split[1];
            if (filename.length > 10) {
                filename = filename.substring(0, 30);
                filename += "...";
            }
            fileName.html(filename);
        }


        //Функция валидации btn
        var checkDisabled = function () {
            var err = checkValid();
            var $errors = allInput.find('.error-border');
            console.log($errors);
            console.log($errors.length, checkBoxError, freeInput, err, freeInputP, freeInputM, freeInputT);
            if ($errors.length == 0 && checkBoxError == 0 && freeInput == 0 && err == 0 && freeInputP == 0 && freeInputM == 0 && freeInputT == 0) {
                $btn.prop('disabled', false); //Меняем атрибут disabled в значение false (делаем кнопку активной)
            } else {
                $btn.prop('disabled', true); //Меняем атрибут disabled в значение true (делаем кнопку неактивной)
            }
        }


        var checkValid = function () {
            var err = 0;
            allInput.each(function () {
                console.log($(this));

                if ($(this).val() != "") {
                    errors = 0;
                    err = 0;
                } else {
                    errors = 1;
                    err = 1;
                }
            })
            return err;
        }
        forms.find(':input[required]').on('keyup', function () {
            console.log($(this))
            if ($(this).length > 0) {
                console.log($(this))
                if ($(this).hasClass('js-input-phone')) {
                    checkValuePhone($(this));
                    checkDisabled();
                }
                if ($(this).hasClass('js-input-mail')) {
                    checkValueMail($(this));
                    checkDisabled();
                }
                if ($(this).hasClass('js-input-text')) {
                    checkValueText($(this));
                    checkDisabled();
                }
            }
        })

        //console.log($(this).find('.custom-checkbox').length !== 0);
        // Проверка на нажатие на чекбокс
        if ($(this).find('.custom-checkbox').length !== 0) {
            $(this).find('.custom-checkbox').on('change', function () {
                console.log($(this))
                if (!$(this).is(':checked')) {
                    checkBoxError = 1;
                    checkDisabled();
                } else {
                    checkBoxError = 0;
                    checkDisabled();
                }
            });
        } else {
            checkBoxError = 0;
        }

        $(this).find('.custom-file-upload').on('change', function () {
            checkFile();
        })

        $(this).find('.form__item').each(function () {
            var err = 1;
            var warn = $(this).find('form__warning');
            if ($(this).find('form__warning').hide()) {
                err = 0;
            } else {
                err = 1;
            }
            warn.on('change', function () {
                if (err > 0) {
                    freeInput = 1;

                    checkDisabled();
                } else {
                    freeInput = 0;
                }
            });

        });


        $btn.click(function (e) {
            formcontent.hide();
            formTitle.hide();
            thanks.show()
        });
    });


//validation
    $(function () {
        jQuery('.js-input-phone').inputmask({
            mask: '+7 (999) 999-99-99',
            showMaskOnHover: true,
            inputmode: 'tel',
            onincomplete: function () {
                checkValuePhone($(this));
            },
            oncomplete: function () {
                checkValuePhone($(this));

            }
        });
//Маска для почты
        jQuery(".js-input-mail").inputmask({
            // mask: "*{1,20}[.*{1,20}]@*{1,20}[.*{1,20}].*{1,20}[.*{1,20}]",
            showMaskOnHover: false,
            onincomplete: function () {
                checkValueMail($(this));

            },
            oncomplete: function () {
                checkValueMail($(this));

            }
        });
// Вызов функции заполнения для текста при введение
        jQuery(".js-input-text").inputmask({
            showMaskOnHover: false,
            onincomplete: function () {
                checkValueText($(this));

            },
            oncomplete: function () {
                checkValueText($(this));

            }
        });


    });


//Функция валидации номера телефона
    var checkValuePhone = function (input) {
        var $th = $(input);
        var phone = $th.val();	//Введенное значение
        var isValid = Inputmask.isValid(phone, {mask: '+7 (999) 999-99-99'});	//Проверяем на валидность
        var $error = $th.parent().find('.js-warning');	//Ищем ошибку
        var $border = $('.js-input-phone');
        //console.log($border);
        if (!isValid) {
            //Если не валидно, то:
            //$btn.prop('disabled', true); //Меняем атрибут disabled в значение true (делаем кнопку неактивной)
            $error.fadeIn(); //Показываем ошибку
            // $error.prop("opacity",1);
            input.addClass("error-border");
            freeInputP = 1;
        } else {
            // $btn.prop('disabled', false); //Меняем атрибут disabled в значение false (делаем кнопку активной)
            $error.fadeOut(); //Скрываем ошибку
            // $error.prop("opacity",0);
            input.removeClass("error-border");
            freeInputP = 0;
        }

    }
//Функция валидации почты
    var checkValueMail = function (input) {
        var $th = $(input);
        var mail = $th.val();	//Введенное значение
        var isValid1 = Inputmask.isValid(mail, {mask: "*{1,20}[.*{1,20}]@*{1,20}.*{1,20}[.*{1,20}]",});	//Проверяем на валидность
        var $error = $th.parent().find('.js-warning');	//Ищем ошибку
        var $border = $('.js-input-mail');
        //console.log($border);
        if (!isValid1) {
            //Если не валидно, то:
            // $btn.prop('disabled', true); //Меняем атрибут disabled в значение true (делаем кнопку неактивной)
            $error.fadeIn(); //Показываем ошибку
            // $error.prop("opacity",1);
            input.addClass("error-border");
            freeInputM = 1;
        } else {
            // $btn.prop('disabled', false); //Меняем атрибут disabled в значение false (делаем кнопку активной)
            $error.fadeOut(); //Скрываем ошибку
            // $error.prop("opacity",0);
            input.removeClass("error-border");
            freeInputM = 0;
        }

    }
//Функция валидации текстовых полей
    var checkValueText = function (input) {
        var $th = $(input);
        var text = $th.val();
        // console.log(text.length);
        var $error = $th.parent().find('.js-warning');	//Ищем ошибку
        var $border = $(input);
        if (text.length < 2) {
            //Если не валидно, то:
            //$btn.prop('disabled', true); //Меняем атрибут disabled в значение true (делаем кнопку неактивной)
            $error.fadeIn(); //Показываем ошибку
            // $error.prop("opacity",1);
            input.addClass("error-border");
            freeInputT = 1;
        } else {
            // $btn.prop('disabled', false); //Меняем атрибут disabled в значение false (делаем кнопку активной)
            $error.fadeOut(); //Скрываем ошибку
            // $error.prop("opacity",0);
            input.removeClass("error-border");
            freeInputT = 0;
        }

    }
}
*/


class Validation {
    #Phone;
    #Mail;
    #Select;
    #Text = [];
    #File;
    #Btn;
    #InputStatus = {}; // obj
    #BtnStatus;
    #AllInputs; // for focus

    constructor(form) {
        if (form) {
            /* btn init */
            let btn = form.querySelector(".btn"); // search btn
            this.#Btn = btn; // init btn selector
            this.#BtnStatus = false; // make btn status
            this.#Btn.disabled = true; // make btn disabled
            /* btn init */

            let inputs = form.querySelectorAll("input"); // find all inputs in form
            this.#AllInputs = inputs; // add at variable all inputs for focus searching
            inputs.forEach((e) => {
                if (e.getAttribute("data-input") != null) {
                    let inputType = e.getAttribute("data-input"); // get type of input
                    this.#InputStatus[`${inputType}`] = false; // make status of input for validation
                    this.SelectInput(inputType, e); // enter value to variable, which contains in form
                }
            });
            this.CheckDisabled(); // validate
        } else {
            console.log("error: haven't form");
        }
    }

    SelectInput(input, value) {
        if (input == "Phone") {
            this.#Phone = value;
            //  this.MuskTel();
        }
        if (input == "Mail") {
            this.#Mail = value;
        }
        if (input == "Select") {
            this.#Select = value;
        }
        if (input == "Text") {
            this.#Text = value;
        }
        if (input == "File") {
            this.#File = value;
        }

    }

    MuskTel() {
        $(function () {
            jQuery('.js-input-phone').inputmask({
                mask: '+7 (999) 999-99-99',
                showMaskOnHover: true,
                inputmode: 'tel',
            });
        })
    }


    CheckDisabled() {

        //todo need method as loop event listner keyup on inputs
        /*focus*/
        this.#AllInputs.forEach((e) => {
            let input = e.getAttribute("data-input") // get full keys/name of inputs
            if (input == "Text" || input == "Mail") {
                e.addEventListener('keyup', () => {
                    /* call function valid */
                    this['Check' + input](); // call function for validation current input
                    if (this.CheckValid() == true) {
                        this.#BtnStatus = true;
                        this.#Btn.disabled = false;
                    } else {
                        this.#BtnStatus = false;
                        this.#Btn.disabled = true;
                    }
                    /* call function valid */
                })
            }
            if (input == "File") {
                e.addEventListener('change', () => {
                    /* call function valid */
                    this['Check' + input](); // call function for validation current input
                    if (this.CheckValid() == true) {
                        this.#BtnStatus = true;
                        this.#Btn.disabled = false;
                    } else {
                        this.#BtnStatus = false;
                        this.#Btn.disabled = true;
                    }
                    /* call function valid */
                })
            }
        })


        /*focus*/


    }

    CheckText() {
        let value = this.#Text.value; // get input value
        let container = this.#Text.closest('label'); // get parent label
        let error = container.querySelector(".js-warning"); // get error msg
        //todo вставлять контент ошибки
        if (value.length < 2) {
            // todo сделать появление ошибки
            this.#Text.classList.add("error-border"); // style error
            this.#InputStatus.Text = false; // input is not valid
        } else {

            this.#Text.classList.remove("error-border"); // style error
            this.#InputStatus.Text = true; // input is not valid
        }
    }

    CheckPhone() {

        let reg = "*{1,20}[.*{1,20}]@*{1,20}.*{1,20}[.*{1,20}]";
        let value = this.#Mail.value; // get input value
        let container = this.#Mail.closest("label"); // get parent label
        let error = container.querySelector(".js-warning"); // get error msg
        let validReg = Inputmask.isValid(value, {mask: '+7 (999) 999-99-99'});//Проверяем на валидность
        validReg = (reg).test(value);
        if (!validReg) {
            // todo сделать появление ошибки
            this.#Phone.classList.add("error-border"); // style error
            this.#InputStatus.Phone = false; // input is not valid
        } else {

            this.#Phone.classList.remove("error-border"); // style error
            this.#InputStatus.Phone = true; // input is not valid
        }

    }

    CheckMail() {
        let email = /([\w-\.]+@[\w\.]+\.{1}[\w]+)/;
        let value = this.#Mail.value; // get input value
        let container = this.#Mail.closest("label"); // get parent label
        let error = container.querySelector(".js-warning"); // get error msg
        console.log(email.test(value))
        let validReg = email.test(value);
        if (!validReg) {
            // todo сделать появление ошибки
            this.#Mail.classList.add("error-border"); // style error
            this.#InputStatus.Mail = false; // input is not valid
        } else {
            this.#Mail.classList.remove("error-border"); // style error
            this.#InputStatus.Mail = true; // input is not valid
        }
    }

    CheckSelect() {

    }

    CheckFile() {

        //todo сделалать сколько символов файлов показывать при создание обьекта класса и переписать на ванильке
        var file = this.#File;
        let container = this.#File.closest("label");
        let msg = container.querySelector("span");
        // var fileLen = fileName.html($('input[type=file]').val().split('\\').pop());
        // console.log(file.value.split('\\').pop().split('.'));
        var split = file.value.split('\\').pop().split('.');
        var filename = split[0];
        var extension = split[1];
        if (filename.length > 10) {
            filename = filename.substring(0, 30);
            filename += "...";
        }
        msg.innerText = filename;
        this.#InputStatus.File = true;
    }


    CheckValid() { // function search false status of all inputs
        let status = true;
        Object.values(this.#InputStatus).forEach((e) => {
            if (e == false) {
                status = false;
            }
        })
        return status;
    }

}

const form = new Validation(document.querySelector(".js-form"));


//todo input mask on phone inicialization only 1


//todo при инициализации класа инициализировать инпут маску для телефона и почты