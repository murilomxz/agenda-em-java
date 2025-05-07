const readline = require("readline-sync")
const fs = require("fs");
const cadastros = {};
const agenda= {};
function menu() {
    console.clear()
    console.log("**Agenda**\n")

    const opcao = Number(readline.question("\ 1. cadastrar usuarios \n 2. mostrar dados de um usuario\n 3. listar todos os nomes cadastrados \n 4. remover usuario \n 5. limpar toda agenda  \n 6. Gravar arquivo \n 7. ler arquivo \n 8. sair\n opcao: "))
    return opcao 

    
}while(true){
    opcao = menu()
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
    else if(opcao == 8){
      break;
    }
    else{
        console.log("Opção inválida!");
}
}

function adicionar() {
    console.clear()
    console.log("**Cadastrar Usuario**\n")
    const nome = readline.question("Digite o nome: ")
    const telefone = readline.question("Digite o Telefone: ")
    const email = readline.question("Digite o Email: ")
    cadastros[nome] = { telefone, email, };
    console.log("Usuário cadastrado com sucesso!");
    



}

function listarUser() {
    console.clear()
    console.log("**Mostar dados de um usuario**\n")

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
    console.clear()
    console.log("**Listar todos os cadastros**\n")
       for (const nome in cadastros) {
            console.log(`* ${nome}`);
            if(nome.lenght===0){
                console.log("ola")
            }
        }
    
  
readline.question("\nEnter para continuar!");
}




function remover() {
    console.clear()
    console.log("**Remover um usuario**\n")
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
    console.log("**Limpar a agenda**\n")
     for(nome in cadastros){
        delete cadastros[nome]
     }
      
    
readline.question("\nEnter para continuar!");
}




function gravar() {
    console.clear()
    console.log("**Gravar a agenda**\n")
    const file="agenda.json"
    const conteudoGravar = JSON.stringify(agenda)
    fs.writeFileSync(file, conteudoGravar);
}














menu()
