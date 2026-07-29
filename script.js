const API = "https://script.google.com/macros/s/AKfycbzMJvnHnBrx4V11GhZh2As-5jEh9ZYl4kRChayRXszsw3HvfNU62G9vIALqPUHMd9nD/exec";

async function verifyCertificate() {

    const id = document.getElementById("certificateId").value.trim();

    if (!id) {
        document.getElementById("result").innerHTML = "Antre ID sètifika a.";
        return;
    }

    document.getElementById("result").innerHTML = "Vérification en cours...";

    try {

        const response = await fetch(API + "?id=" + encodeURIComponent(id));
        const data = await response.json();

        if (data.success) {

            document.getElementById("result").innerHTML = `
            <div style="background:#fff;padding:20px;border-radius:10px;box-shadow:0 0 10px rgba(0,0,0,.15);text-align:left;">
                <h2 style="color:green;">🟢 CERTIFICAT AUTHENTIQUE</h2>

                <p><strong>🆔 ID :</strong> ${data.id}</p>
<p><strong>👤 Nom :</strong> ${data.nom}</p>
<p><strong>📚 Formation :</strong> ${data.formation}</p>
<p><strong>📅 Date :</strong> ${data.date}</p>
<p><strong>📍 Lieu :</strong> ${data.lieu}</p>
<p><strong>🔒 Statut :</strong> ${data.statut}</p>

<hr>

<p>${data.message}</p>

<a href="${data.certificat || '#'}"
target="_blank"
style="
display:inline-block;
margin-top:15px;
padding:12px 20px;
background:#0B3D91;
color:white;
text-decoration:none;
border-radius:10px;
font-weight:bold;">
📄 Voir le certificat
</a>
            </div>`;
        } else {

            document.getElementById("result").innerHTML = `
            <div style="background:#ffe5e5;padding:20px;border-radius:10px;">
                <h2 style="color:red;">🔴 CERTIFICAT NON VALIDE</h2>
                <p>${data.message}</p>
            </div>`;
        }

    } catch (error) {

        document.getElementById("result").innerHTML =
        "❌ Erè pandan verifikasyon.";
    }

}

window.onload = function () {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
        document.getElementById("certificateId").value = id;
        verifyCertificate();
    }

};
