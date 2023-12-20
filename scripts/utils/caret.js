const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    //const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    //const options = dropdown.querySelector("menu button");
    const selected = dropdown.querySelector('.selected');
    const chevron = dropdown.querySelector('.fa-chevron-down')

    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        //caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
        chevron.classList.toggle('fa-chevron-down-rotate');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;

            select.classList.remove('select-clicked');
            //caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
            chevron.classList.remove('fa-chevron-down-rotate');

            options.forEach(option => {
                option.classList.remove('active');
            });
            
            option.classList.add('active');
        });
    });
});