let csvArray = [];
let ubiEst = 0;
let ubiMun = 0;
let totalLoc = 0;
let ubiEst1 = 0;
let totalLocEst = 0;
let totalHabFed = 0;
let totalHabMasc = 0;
let totalHabFem = 0;
let totalHabRural = 0;
let totalHabUrb = 0;
let vivHabEst = [];
let estados = [];
let municipiosEst = [];
let selectorMuni = [];
let mayor = 0;
let ubiEstMayor = 0;
let ubiMunMayor = 0;
let totalMayorMun = 0;
let nomMayor = ""

document.getElementById("input_censo").addEventListener("change", function (event) {
    const arch = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(arch, 'UTF-8');

    reader.onload = function (e) {
        const csvString = e.target.result;
        csvArray = csvString
            .split('\n')
            .map(line => line.replace(/\r/g, '').replace(/\*/g, '0').replace(/\-/g, '0').split(','));

        const selector = document.getElementById("selector_estado");
        const selector1 = document.getElementById("selector_estado1");

        for (let i = 0; i < csvArray.length - 2; i++) {
            if (csvArray[i][1] != csvArray[i + 1][1] || csvArray[i][5] == csvArray[0][5]) {
                const estadoActual = csvArray[i + 1][1];
                
                if (!estados.includes(estadoActual)) {
                    estados.push(estadoActual);
        
                    const nuevaOpcion = document.createElement("option");
                    const nuevaOpcion1 = document.createElement("option");
        
                    nuevaOpcion.value = csvArray[i + 1][0]; 
                    nuevaOpcion1.value = csvArray[i + 1][0]; 
                    nuevaOpcion.text = estadoActual; 
                    nuevaOpcion1.text = estadoActual;  
        
                    selector.appendChild(nuevaOpcion);
                    selector1.appendChild(nuevaOpcion1);
                }
            }
        }

        selector1.addEventListener("change", function () {
            const valorSeleccionado1 = selector1.value;
            console.log("Estado seleccionado:", valorSeleccionado1);

            for (let i = 0; i < csvArray.length - 1; i++) {
                if (valorSeleccionado1 == csvArray[i][0]) {
                    ubiEst = i;
                    break;
                }
            }

            const selectorMun = document.getElementById("selector_mun");
            selectorMun.innerHTML = "";
        
            for (let i = ubiEst; i < csvArray.length && csvArray[i][0] === valorSeleccionado1; i++) {
                if (csvArray[i][3] != csvArray[i + 1][3]) {
                    const nuevaOpcionMun = document.createElement("option");
        
                    nuevaOpcionMun.value = csvArray[i][2];
                    nuevaOpcionMun.text = csvArray[i][3];
        
                    selectorMun.appendChild(nuevaOpcionMun);
                }
            }
        
            selectorMun.addEventListener("change", function () {
                const valorSeleccionadoMun = selectorMun.value;
                selectorMuni = valorSeleccionadoMun
                console.log("Municipio seleccionado:", valorSeleccionadoMun);
        
                for (let i = ubiEst; i < csvArray.length && csvArray[i][0] === valorSeleccionado1; i++) {
                    if (valorSeleccionadoMun == csvArray[i][2]) {
                        ubiMun = i;
                        break;
                    }
                }
            });
        });
        

        boton_mostrarLocFed.addEventListener("click", function() {
            totalLoc = 0;
            let res = document.getElementById("totalLoc_resultado");
            for (let i = 0; i < csvArray.length - 1; i++) {
                totalLoc++;
            }
            res.innerHTML = totalLoc;
        });

        boton_mostrarLocEst.addEventListener("click", function() {
            totalLocEst = 0;
            const valorSeleccionado1 = selector.value;
            let res = document.getElementById("totalLocEst_resultado");
            for (let i = 0; i < csvArray.length - 1; i++) {
                if (valorSeleccionado1 == csvArray[i][0]) {
                    ubiEst1 = i;
                    break;
                }
            }
            

            for (let i = ubiEst1; i < csvArray.length && csvArray[i][0] === valorSeleccionado1; i++) {
                totalLocEst++;
            }
            res.innerHTML = totalLocEst;
        }); 

        boton_mostrarHabFed.addEventListener("click", function() {
            totalHabFed = 0;
            let res = document.getElementById("totalHabFed_resultado");

            for (let i = 0; i < csvArray.length - 1; i++) {
                if (!isNaN(parseInt(csvArray[i][7]))) {
                    totalHabFed += parseInt(csvArray[i][7]);
                }
            }
            res.innerHTML = totalHabFed;
        });

        boton_mostrarHabMascFem.addEventListener("click", function() {
            let res = document.getElementById("totalHabMascFed_resultado");
            let res1 = document.getElementById("totalHabFemFed_resultado");
            totalHabMasc = 0;
            totalHabFem = 0;

            for (let i = 0; i < csvArray.length - 1; i++) {
                if (!isNaN(parseInt(csvArray[i][8]))) {
                    totalHabMasc += parseInt(csvArray[i][8]);
                }
            }

            for (let i = 0; i < csvArray.length - 1; i++) {
                if (!isNaN(parseInt(csvArray[i][9]))) {
                    totalHabFem += parseInt(csvArray[i][9]);
                }
            }

            totalFM = totalHabMasc + totalHabFem;
            porcFem = ((totalHabFem / totalFM) * 100).toFixed(2);
            res1.innerHTML = totalHabFem + " (" + porcFem + "%)";
            porcMasc = ((totalHabMasc / totalFM) * 100).toFixed(2);
            res.innerHTML = totalHabMasc  + " (" + porcMasc + "%)";
            totalHabFemMasc_resultado.innerHTML = (totalFM) + " (100%)";
        });

        boton_mostrarHabRurUrb.addEventListener("click", function() {
            totalHabUrb = 0;
            totalHabRural = 0;
            let res = document.getElementById("totalHabRurFed_resultado");
            let res1 = document.getElementById("totalHabUrbFed_resultado");
            let res2 = document.getElementById("totalHabRurUrbFed");

            for (let i = 0; i < csvArray.length - 1; i++) {
                if (csvArray[i][6] == "R") {
                    if (!isNaN(parseInt(csvArray[i][7]))) {
                        totalHabRural += parseInt(csvArray[i][7]);
                    }
                }
                else {
                    if (!isNaN(parseInt(csvArray[i][7]))) {
                        totalHabUrb += parseInt(csvArray[i][7]);
                    }
                }
            }

            res.innerHTML = totalHabRural;
            res1.innerHTML = totalHabUrb;
            res2.innerHTML = totalHabRural + totalHabUrb;
        });

        boton_mostrarVivEst.addEventListener("click", function () {
            const numEstados = 32;
            let refEst = 1;
            let vivHabEst = Array(numEstados).fill(0); 
        
            for (let i = 0; i < csvArray.length - 1; i++) {
                if (csvArray[i][0] == refEst) {
                    if (!isNaN(parseInt(csvArray[i][10]))) {
                        vivHabEst[refEst - 1] += parseInt(csvArray[i][10]);
                    }
        
                    if (csvArray[i][0] != csvArray[i + 1][0]) {
                        refEst++;
                        if (refEst > numEstados) break;
                    }
                }
            }

            let tabla = document.getElementById("tabla");
            let tbody = tabla.querySelector("tbody");

            for (let i = 1; i <= numEstados; i++) { 
                let tr = document.createElement("tr");
                let tdEstado = document.createElement("td");
                let tdVivHab = document.createElement("td"); 

                tdEstado.textContent = estados[i - 1];
                tdVivHab.textContent = vivHabEst[i - 1];

                tr.appendChild(tdEstado);
                tr.appendChild(tdVivHab);
                tbody.appendChild(tr);
            }
        });

        boton_mostrarLocMun.addEventListener("click", function () {
            municipiosEst = [];

            for (let i = ubiMun; i < csvArray.length && csvArray[i][2] === selectorMuni; i++) {
                if (csvArray[i][5] != csvArray[i + 1][5]) {
                    municipiosEst.push(csvArray[i][5]);
                }
            }

            let tabla = document.getElementById("tabla1");
            let tbody = tabla.querySelector("tbody");
            municipiosEst.sort();

            for (let i = 0; i <= municipiosEst.length; i++) { 
                let tr = document.createElement("tr");
                let tdMun = document.createElement("td"); 

                tdMun.textContent = municipiosEst[i];

                tr.appendChild(tdMun);
                tbody.appendChild(tr);
            }
        });

        boton_mostrarMayor.addEventListener("click", function () {
            let numMunicipios = [];
            let poblacionMunicipios = []; 
            
            for (let i = 0; i < csvArray.length - 1; i++) {
                let estado = csvArray[i][0];
                let municipio = csvArray[i][2];
                let poblacionLocalidad = parseInt(csvArray[i][10]) || 0; 
            
                let claveMunicipio = `${estado}-${municipio}`;
            
                let indiceMunicipio = numMunicipios.indexOf(claveMunicipio);
            
                if (indiceMunicipio !== -1) {
                    poblacionMunicipios[indiceMunicipio] += poblacionLocalidad;
                } else {
                    numMunicipios.push(claveMunicipio);
                    poblacionMunicipios.push(poblacionLocalidad);
                }
            }
            
            let indiceMasPoblado = 0;
            for (let i = 1; i < poblacionMunicipios.length; i++) {
                if (poblacionMunicipios[i] > poblacionMunicipios[indiceMasPoblado]) {
                    indiceMasPoblado = i;
                }
            }
            
            let municipioMasPoblado = numMunicipios[indiceMasPoblado];

            let est = parseInt(municipioMasPoblado[0]);
            let mun = parseInt(municipioMasPoblado[2]);

            for (let i = 0; i < csvArray.length - 1; i++) {
                if (est == csvArray[i][0]) {
                    ubiEstMayor = i;
                    break;
                }
            }

            for (let i = ubiEstMayor; i < csvArray.length; i++) {
                if (mun == csvArray[i][2]) {
                    ubiMunMayor = i;
                    break;
                }
            }
            nomMayor = csvArray[ubiMunMayor][3];

            munMayor.innerHTML = nomMayor;

            estadoMayor.innerHTML=estados[est]

            for (let i = ubiMunMayor; i < csvArray.length; i++) {
                if (est == csvArray[i][0]) {
                    if (csvArray[i][2] == mun) {
                        if (!isNaN(parseInt(csvArray[i][7]))) {
                            totalMayorMun += parseInt(csvArray[i][7]);
                        }
                    }
                }
            }

            totalMayor.innerHTML = totalMayorMun;
        });
    };
});