
function init() {

   

    if(document.cookie == null || document.cookie == "token=" || document.cookie == ""){
        
        window.location.replace('http://localhost:8000/admin/login');
    }


    
    document.getElementById('logOut').addEventListener('click', e => {
        console.log("POGODIO LOGOut")
        e.preventDefault();
        document.cookie = `token=;SameSite=Lax`;
        window.location.replace('http://localhost:8000/admin/login');

    });




    document.getElementById('dodajKorisnika').addEventListener('click', e => {
        e.preventDefault();
        const data = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            email: document.getElementById('email').value.replace(/\s/g, ''),
            role: document.getElementById('roleSelect').value
        };
        
        

        if(data.firstName.length < 3 ){
            alert("Ime mora imati vise od dva karaktera!")
            return
        }
        if(data.lastName.length < 3  ){
            alert("Prezime mora imati vise od dva karaktera")
            return
        }
        if(data.username.length < 3 ){
            alert("Username mora imati vise od dva karaktera")
            return
        }
        if(data.password.length < 3 ){
            alert("Sifra mora imati vise od dva karaktera")
            return
        }
        if(data.email.length < 8 )
        {
            alert("Email je neispravan")
            return
        }
        
        if(data.role != "Admin" && data.role != "Moderator" ){
            alert("Rola moze biti samo Admin ili Moderator!")
            return
        }
        
        console.log(data);
        
        fetch('http://localhost:8080/korisnici/dodajKorisnika', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then( res => res.json() )
        .then( data => {
            if(data == "True"){
                alert("Uspesno ste dodali korisnika!");
                window.location.reload();
            }
            else{
                 alert(data);
            }
        });
       

    });
}