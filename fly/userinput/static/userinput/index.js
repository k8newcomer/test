let searchModeInput = document.getElementById("search-mode");
let clusterParamsGroup = document.getElementById("cluster-params-group");

searchModeInput.addEventListener("change", function() {
  let selected = this.options[this.selectedIndex].innerText;
  clusterParamsGroup.hidden = !(selected === "Clusters");
});

searchModeInput.dispatchEvent(new Event("change"));

function updateClusterParams() {
  let container = document.getElementById("params-for-each-cluster");
  let sequences = this.value.split("\n");

  container.innerHTML = "";

  for (let i = 0; i < sequences.length; i++) {
    let sequence = sequences[i];
    let controlGroup = document.createElement("div");
    controlGroup.className = "pure-control-group";

    let label = document.createElement("label");
    label.attributes["for"] = `cluster-${sequence}`;
    label.innerHTML = `${sequence} has`;

    let select = document.createElement("select");
    select.id = `cluster-${sequence}-mode`;
    select.name = select.id;

    let atLeast = document.createElement("option");
    atLeast.value = "min";
    atLeast.innerHTML = "At least"

    let atMost = document.createElement("option");
    atMost.value = "max";
    atMost.innerHTML = "At most"

    select.appendChild(atLeast);
    select.appendChild(atMost);

    let count = document.createElement("input");
    count.type = "number";
    count.value = 0;
    count.name = "cluster-${sequence}-number-of-hits";

    controlGroup.appendChild(label);
    controlGroup.appendChild(select);
    controlGroup.appendChild(count);

    container.appendChild(controlGroup);
  }
}

document.getElementById("sequences").addEventListener("keyup", updateClusterParams);
document.getElementById("sequences").dispatchEvent(new Event("keyup"));
