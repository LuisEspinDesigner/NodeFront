window.addEventListener("load",cargaDatos);
function cargaDatos(){
	$.ajax({
		type: "GET",
		url: "http://localhost:3000/books",
		dataType: "json",
		beforeSend: function () { },
		success: function (data) {
			llama(data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR.statusCode);
			console.log(textStatus);
		},
	});
}
function llama(data) {
	$.each(data, function (key, value) {
		document.getElementById("tbody").innerHTML += `<tr>
			<th scope="row">` + value.book_id + `</th>
			<td>` + value.book_codigo + `</td>
			<td>` + value.book_titulo + `</td>
			<td>` + value.book_autor + `</td>
			<td>` + value.book_anio + `</td>
			<td>` + value.book_editorial + `</td>
			<td>` + value.book_edicion + `</td>
			<td>` + value.book_isbn + `</td>
			<td>` + value.book_precio + `</td>
			<td>` + value.book_stock + `</td>
			<td>
			<button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#miModal" 
			data-id="` + value.book_id + `">Actualizar</button>
			</td>
			<td><button type="button" class="btn btn-danger" data-id="` + value.book_id + `">Borrar</button>
			</td>
			</tr>`;
	});
}
$(document).ready(function () {
	$('#btnsave').click(function (e) {
		e.preventDefault();
		var jsondata = {
			codigo: $('#book_codigo').val(),
			"titulo": $('#book_titulo').val(),
			"autor": $('#book_autor').val(),
			"anio": $('#book_anio').val(),
			"editorial": $('#book_editorial').val(),
			"edicion": $('#book_edicion').val(),
			"isbn": $('#book_isbn').val(),
			"stock": $('#book_stock').val(),
			"precio": $('#book_precio').val()
		}
	
		$.ajax({
			type: "POST",
			url: "http://localhost:3000/book",
			data: JSON.stringify(jsondata),
			contentType: 'application/json',
			dataType: "json",
			beforeSend: function () { },
			success: function (data) {
				$('tbody').html("");
				cargaDatos();
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(jqXHR.status);
				console.log(textStatus);
			},
		});
	});
});