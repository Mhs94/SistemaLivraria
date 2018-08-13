
$(document).ready(function () {
    var lar = window.screen.availHeight;
    var alt = window.screen.availWidth;
    window.resizeTo(alt, lar);
    loadData(1);
});



//Carregar tabela de livros; 
function loadData() {

    URL = "";

        if ($('#BookName').val() == "") {
            URL = "http://localhost:51412/api/Livro";
        }
        else {
            URL = "http://localhost:51412/api/Livro/" + $('#BookName').val();
        }
    
    $.ajax({
        url: URL,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.cod + '</td>';
                html += '<td>' + item.titulo + '</td>';
                html += '<td>' + item.autor + '</td>';
                html += '<td>' + item.editora + '</td>';
                html += '<td>' + item.numeroPaginas + '</td>';
                html += '<td>' + item.anoPublicacao + '</td>';



                html += '<td><a href="#" onclick="return getbyID(' + item.cod + ')">Editar</a> | <a href="#" onclick="Delete(' + item.cod + ')">Excluir</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormess) {
            alert(errormess.responseText);
        }
    });
}
function SearchByName() {
    loadData();
}

//Adicionar um novo livro
function Add() {
    var res = validate();

    if (res == false) {
        return false;
    }
    var livroObj = {
        //LivroId: $('#LivroId').val(),
        titulo: $('#titulo').val(),
        editora: $('#editora').val(),
        autor: $('#autor').val(),
        anoPublicacao: $('#anoPublicacao').val(),
        numeroPaginas: $('#numeroPaginas').val(),

    };
    $.ajax({
        url: "http://localhost:51412/api/Livro",
        data: JSON.stringify(livroObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#myModal').modal('hide');

            location.reload();
            if (result == 0)
                alert("Não foi possível adicionar um novo livro. Tente novamente!")
            //loadData();

        },
        error: function (errormess) {
            alert("Dados Inválidos");
        }
    });
}

//seleciona livro por Id para o Update
function getbyID(LivroId) {
    $('#titulo').css('border-color', 'lightgrey');
    $('#autor').css('border-color', 'lightgrey');
    $('#editora').css('border-color', 'lightgrey');
    $('#anoPublicacao').css('border-color', 'lightgrey');
    $('#numeroPaginas').css('border-color', 'lightgrey');


    $.ajax({
        url: "http://localhost:51412/api/Livro/" + LivroId,
        
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            

            $.each(result, function (key, item) {
                $('#LivroId').attr("placeholder", item.cod);
                $('#autor').val(item.autor);
                $('#titulo').val(item.titulo);
                $('#editora').val(item.editora);
                $('#anoPublicacao').val(item.anoPublicacao);
                $('#numeroPaginas').val(item.numeroPaginas);


                $('#myModal').modal('show');
                $('#btnUpdate').show();
                $('#btnAdd').hide();
            });
        },
        error: function (errormess) {
            alert(errormess.responseText);
        }
    });
    return false;
}

//metodo para atualizar um  livro
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var codLivro = $('#LivroId').attr("placeholder");
    var livroObj = {
        cod: $('#LivroId').attr("placeholder"),
        titulo: $('#titulo').val(),
        autor: $('#autor').val(),
        editora: $('#editora').val(),
        anoPublicacao: $('#anoPublicacao').val(),
        numeroPaginas: $('#numeroPaginas').val(),

    };
    $.ajax({
        
        url: "http://localhost:51412/api/Livro/"+codLivro,
        data: JSON.stringify(livroObj),
        type: "PUT",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#LivroId').val("");
            $('#autor').val("");
            $('#titulo').val("");
            $('#editora').val("");
            $('#anoPublicacao').val("");
            $('#numeroPaginas').val("");
            if (result == 0)
                alert("Não foi possível atualizar as informações do livro. Tente novamente!")

        },
        error: function (errormess) {
            alert("Dados Inválidos");
        }
    });
}

//metodo para excluir um livro  
function Delete(ID) {
    var ans = confirm("Deseja excluir este livro?");
    if (ans) {
        $.ajax({
            url: "http://localhost:51412/api/Livro/"+ID,
            
            type: "DELETE",
            contentType: "application/json;charset=UTF-8",
            
            success: function (result) {
                if (result == 0)
                    alert("Não foi possível excluir o livro. Tente novamente!")
                location.reload();
            },
            error: function (errormess) {
                alert(errormess.responseText);
            }
        });
    }
}

//metodo para zerar as caixas de texto
function clearTextBox() {
    $('#LivroId').val("");
    $('#LivroId').attr("placeholder", "ID");
    $('#titulo').val("");
    $('#autor').val("");
    $('#editora').val("");
    $('#anoPublicacao').val("");
    $('#numeroPaginas').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#titulo').css('border-color', 'lightgrey');
    $('#autor').css('border-color', 'lightgrey');
    $('#editora').css('border-color', 'lightgrey');
    $('#anoPublicacao').css('border-color', 'lightgrey');
    $('#numeroPaginas').css('border-color', 'lightgrey');

}
//metodo para validacao  
function validate() {
    var isValid = true;
    if ($('#titulo').val().trim() == "") {
        $('#titulo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#titulo').css('border-color', 'lightgrey');
    }

    if ($('#autor').val().trim() == "") {
        $('#autor').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('aAutor').css('border-color', 'lightgrey');
    }


    if ($('#editora').val().trim() == "") {
        $('#editora').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#editora').css('border-color', 'lightgrey');
    }
    if ($('#anoPublicacao').val().trim() == "") {
        $('#anoPublicacao').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#anoPublicacao').css('border-color', 'lightgrey');
    }

    if ($('#numeroPaginas').val().trim() == "") {
        $('#numeroPaginas').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#numeroPaginas').css('border-color', 'lightgrey');
    }


    return isValid;
} 