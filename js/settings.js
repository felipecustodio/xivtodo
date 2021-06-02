// Validate the form, fetch Lodestone data, and save it in local storage.
// This is called from the "Save" button.
function saveSettings() {
    let settingsFormValues = new FormData(document.querySelector("#settings-form"))

    $("#settings-save-btn").prop('disabled', true)
    $("#settings-save-btn").html("<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Saving...")

    $.ajax({
        url: "https://xivapi.com/character/" + settingsFormValues.get("inputCharacterID") + "?data=AC",
        dataType: "json",
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            renderError("The character ID you've entered does not exist.")

            $("#settings-save-btn").prop('disabled', false)
            $("#settings-save-btn").html("Save")
        },
        success: function(data) {
            lastUpdated = parseInt(Date.now()/1000)
            localStorage.setItem("lastUpdated", lastUpdated)

            localStorage.setItem("characterID", settingsFormValues.get("inputCharacterID"))
            localStorage.setItem("spoilersOption", settingsFormValues.get("inputSpoilersOption"))

            localStorage.setItem("character", JSON.stringify(data["Character"]))
            localStorage.setItem("achievements", JSON.stringify(data["Achievements"]))
            localStorage.setItem("achievementsPublic", JSON.stringify(data["AchievementsPublic"]))

            $("#last-updated").html("Last updated on " + moment.unix(lastUpdated).format("lll") + ".")

            $("#settings-save-btn").prop('disabled', false)
            $("#settings-save-btn").html("Save")
        }
    })
}

// Fill in the form with predefined values.
if (characterID != null) {
    $("#inputCharacterID").val(characterID)
}
if (spoilersOption != null) {
    $("#inputSpoilersOption").val(spoilersOption);
    $('input:radio[name=inputSpoilersOption]')[spoilersOption].checked = true;
}

if (lastUpdated != null) {
    $("#last-updated").html("Last updated on " + moment.unix(lastUpdated).format("lll") + ".")
}