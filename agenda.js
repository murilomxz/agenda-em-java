const readline = require("readline-sync")
const fs = require("fs");



const verde = "\x1b[32m";
const vermelho = "\x1b[31m";
const amarelo = "\x1b[33m";
const azul = "\x1b[34m";
const reset = "\x1b[0m";

let cadastros = {};

function menu() {
    console.clear()
    console.log(verde, "**Agenda**\n", reset)

    console.log("\ 1. cadastrar usuarios \n 2. mostrar dados de um usuario\n 3. listar todos os nomes cadastrados \n 4. remover usuario \n 5. limpar toda agenda  \n 6. Gravar arquivo \n 7. ler arquivo \n 8. sair\n");
    const opcao = Number(readline.question(`${verde}Opcao: ${reset}`));
    return opcao ;

    
}
function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}
function validarFone(fone) {
    const regex = /^\d{2}\s\d{4,5}-\d{4}$/;

    if (regex.test(fone)) {
        return true;
    } else {
        return false;
    }
}

function adicionar() {
    console.clear();
    console.log(amarelo, "**Cadastrar Usuario**\n", reset);

    let nome;
    let telefone;
    let email;

    do {
        nome = readline.question("Digite o nome: ");
        if (nome === "") {
            console.log("O nome não pode estar em branco. Tente novamente.");
        }
    } while (nome === "");

    do {
        telefone = readline.question("Digite o Telefone: ");
        if (telefone === "") {
            console.log("O telefone não pode estar em branco. Tente novamente.");
        } else if (validarFone(telefone)== false) {
            console.log("Telefone inválido! Tente novamente.");
            telefone = ""; 
        }
    } while (telefone === "");

    do {
        email = readline.question("Digite o Email: ");
        if (email === "") {
            console.log("O email não pode estar em branco. Tente novamente.");
        }  else if (validarEmail(email)== false) {
            console.log("Email inválido! Tente novamente.");
            email = ""; 
        }
    } while (email === "");



   
    cadastros[nome] = { telefone, email };
    console.log("Usuário cadastrado com sucesso!");
}

function listarUser() {
    console.clear()
    console.log(verde, "**Mostar dados de um usuario**\n", reset)

    const nome = readline.question("Informe o nome do usuario: ")
    const user = cadastros[nome];
    if (user) {
        console.log(`Nome: ${nome}`);
        console.log(`Telefone: ${user.telefone}`);
        console.log(`Email: ${user.email}`);
       
    } else {
        console.log("Usuário não encontrado.");
      
    }
  
readline.question("\nEnter para continuar!");
  

}




function listar() {
    console.clear();
    console.log(azul, "**Listar todos os cadastros**\n", reset);

    let temCadastro = false;

    for (const nome in cadastros) {
        temCadastro = true;
        console.log(`* ${nome}`);
    }

    if (temCadastro== false) {
        console.log("Nenhum cadastro encontrado.");
    }

    readline.question("\nEnter para continuar!");
}




function remover() {
    console.clear()
    console.log(vermelho, "**Remover um usuario**\n", reset)
    const del=readline.question("Qual usuario voce deseja remover? ")
    const user = cadastros[del];
    if (user) {
       delete cadastros[del]
       console.log("Usuário removido com sucesso!")
      
    } else {
        console.log("Usuário não encontrado.");
      
    }
   
readline.question("\nEnter para continuar!");
}
    



function limpar() {
    console.clear()
    console.log(vermelho, "**Limpar a agenda**\n", reset)
   const resposta= readline.question("Voce tem certeza que deseja limpar toda a agenda(S/N)? ")
   if (resposta === "S" || resposta === "s" || resposta === "sim") {
    for (let nome in cadastros) {
        delete cadastros[nome];
    }
    console.log("Agenda limpa com sucesso!");
} else {
    console.log("Operação cancelada.");
}

      
    
readline.question("\nEnter para continuar!");
}




function gravar() {
    console.clear()
    console.log(azul, "**Gravar a agenda**\n", reset)
   
    const conteudoGravar = JSON.stringify(cadastros)
    fs.writeFileSync("./agenda.json", conteudoGravar);
    console.log("AGENDA GRAVADA !!!!")

    readline.question("\nEnter para continuar!");
}


function ler_agenda(){
    console.clear()
    const file= "agenda.json";
    const filebuffer=fs.readFileSync(file, "utf-8");

    const contentJson= JSON.parse(filebuffer);

    cadastros = contentJson;

    console.log("ACÃO CONCLUIDA !!!!")

    readline.question("\nEnter para continuar!");
}


while(true){
    console.clear()
   let  opcao = menu()
    if (opcao == 1) {
        adicionar()
    }
    else if (opcao == 2) {
        listarUser()
    }
    else if (opcao == 3) {
        listar()

    }
    else if(opcao == 4){
        remover()
    }
    else if(opcao == 5){
        limpar()
    }
    else if(opcao == 6){
        gravar()
    }
    else if(opcao == 7){
        ler_agenda()
    }
    else if(opcao == 8){
      break;
    }
    else{
        console.clear()
        console.log(vermelho, "Opção inválida!" , reset);
        readline.question("\nEnter para continuar!");
  
        
}
}









