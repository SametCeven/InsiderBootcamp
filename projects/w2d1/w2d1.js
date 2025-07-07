
let choice;

let person = {};
let name;
let age;
let occ;

let products = [{ product: "Laptop", price: 100 }, { product: "Mouse", price: 10 }, { product: "TV", price: 70 }];
let cart = [];

do {
    choice = prompt(
        `--- ANA MENÜ ---
        1 - Kullanıcı bilgilerinizi girin
        2 - Sepete ürün ekle
        3 - Sepetten ürün çıkar
        4 - Sepeti görüntüle
        5 - Çık
        `
    );

    switch (choice) {
        case "1":
            name = prompt("Adınız nedir?");
            while (true) {
                age = Number(prompt("Yaşınız kaç?"));
                if (isNaN(age)) alert("Sayı girmelisiniz.");
                else break;
            }
            occ = prompt("Mesleğiniz nedir?");
            person = { name, age, occ };
            console.log(person);
            alert(`Kullanıcı Bilgileri: \nAd: ${person.name} \nYaş: ${person.age} \nMeslek: ${person.occ}`);
            break;

        case "2":
            let product;
            let menuText = products.map((product, index) => {
                return `${index + 1} - Ürün: ${product.product} | Fiyat: ${product.price}`
            }).join(`\n`);

            let choiceProduct = prompt(
                `--- ÜRÜNLER --- \n${menuText}`
            );

            product = products[Number(choiceProduct) - 1];
            cart.push(product);
            console.log(cart);

            let sum = cart.reduce((acc, currVal) => {
                return acc + currVal.price;
            }, 0);

            let cartText = cart.map((c) => {
                return `${c.product}  ${c.price}`;
            }).join(`\n`);

            alert(`Sepetiniz : \n${cartText}\nSepet Toplamı : ${sum}`);
            break;

        case "3":
            let productRem;
            let menuTextRem = cart.map((product, index) => {
                return `${index + 1} - Ürün: ${product.product} | Fiyat: ${product.price}`
            }).join(`\n`);

            let choiceProductRem = prompt(
                `--- SEPETTEKİ ÜRÜNLER --- \n${menuTextRem}`
            );

            productRem = cart[Number(choiceProductRem) - 1];
            cart = cart.filter((c, index) => {
                return index !== Number(choiceProductRem)-1;
            });
            console.log(cart);

            let sumRem = cart.reduce((acc, currVal) => {
                return acc + currVal.price;
            }, 0);

            let cartTextRem = cart.map((c) => {
                return `${c.product}  ${c.price}`;
            }).join(`\n`);

            alert(`Sepetiniz : \n${cartTextRem}\nSepet Toplamı : ${sumRem}`);
            break;

        case "4":
            let menuTextCart = cart.map((product, index) => {
                return `${index + 1} - Ürün: ${product.product} | Fiyat: ${product.price}`
            }).join(`\n`);

            alert(`--- SEPETTEKİ ÜRÜNLER --- \n${menuTextCart}`);
            break;

        case "5":
            alert("Hoşçakalın");
            break;

        default:
            alert("Hatalı giriş");
    };

} while (choice !== "5");







