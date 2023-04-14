<script>
    /* imports */
    import { circOut, circIn, circInOut } from 'svelte/easing';

    /* animation */
    let fadedClass = true;

    function intro(node, { mode, init, duration }) {
        return {
			duration,
			css: t => {
				let eased;

                if (mode.toLowerCase() == 'in') {
                    eased = circOut(t);
                } else if (mode.toLowerCase() == 'out') {
                    eased = circIn(t);
                } else {
                    eased = circInOut(t);
                }

				return `
                    transform: scale(${init+(eased*(1-init))});
                    opacity: ${eased};
                `
			}
		};
    }

	/* props */
	export let cardColor = 'var(--carpet)';
</script>

<div
    class="card-main_card"
    style="border-color: {cardColor};"
    in:intro="{{mode: 'in', init: 0.9, duration: 100}}"
    out:intro="{{mode: 'out', init: 0.9, duration: 100}}"
>
	<slot></slot>
</div>

<style>

.card-main_card {
	background-color: var(--carpet);
	border: 1px solid var(--carpet);
	box-shadow: var(--default-shadow);
	display: flex;
	flex-direction: column;
	min-width: 200px;
	padding: 1em;
	width: max-content;
	z-index: 1;
	opacity: 100%;
	transition: transform 0.25s, opacity 0.25s;
	/* font-family: Trebuchet MS, sans-serif;
	position: relative;
	margin: 10px;
	box-sizing: border-box;
	height: min-content;
	overflow: hidden;
	transform: scale(1); */
}

/* .card-main_card.faded {
	transform: scale(0.8);
	opacity: 0;
} */

.card-main_card :global(.card-top_bar) {
/* 	border: 1px solid red; */
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	display: flex;
	justify-content: flex-end;
}

.card-main_card :global(.card-top_bar button.close) {
	margin: 5px;
/* 	border-color: var(--red); */
/* 	color: var(--red); */
	font-size: 10px;
	padding: 0;
	width: 15px;
	height: 15px;
	border-radius: 10px;
}

.card-main_card :global(.center) {
	align-self: center;
}

.card-main_card :global(span) {
	cursor: context-menu;
}

.card-main_card :global(details) {
	color: red;
}

.card-main_card :global(details summary) {
	cursor: pointer;
	letter-spacing: 0.2em;
	font-size: small;
}

.card-main_card :global(table) {
	/* width: 500px; */
	border-collapse: collapse;
	/*border-collapse: separate;*/
	/*border-spacing: 0;*/
	font-size: small;
	cursor: context-menu;
	background-color: white;

	display: grid;
	grid-row-gap: 1px;
	margin-top: 1em;
}

.card-main_card :global(table tr) {
	transition: all 0.25s;

	display: grid;
	grid-column-gap: 1px;
	grid-template-columns: min-content auto min-content;
	position: relative;
}

.card-main_card :global(table tr:last-child) {
/* 	border: 2px solid var(--accent); */
	background-color: #f5faff;
	box-shadow: 0px 0px 2px 2px var(--accent);
}

.card-main_card :global(table tr:last-child::after) {
	color: var(--accent);
	content: "VERSIÓN ACTUAL";
	font-size: 8px;
	left: 50%;
	position: absolute;
	text-decoration: underline;
	top: 0.5em;
	transform: translateX(-50%);
}

.card-main_card :global(table tr:last-child td) {
	padding-top: 1.5em;
}

.card-main_card :global(table tr:hover td),
.card-main_card :global(table tr:hover th) {
	color: var(--dark-grey);
}

.card-main_card :global(table tr:hover) {
	box-shadow: var(--default-shadow);
}

.card-main_card :global(table tr td),
.card-main_card :global(table tr th) {
	padding: 1em;
	border: 1px solid var(--light-grey);
	transition: all 0.25s;
}

.card-main_card :global(table tr td) {
	text-align: left;
	color: var(--light-mid-grey);
}

.card-main_card :global(table td) {
	align-items: center;
	box-shadow: 0px 0px 0px 1px var(--light-grey);
	color: var(--light-mid-grey);
	cursor: context-menu;
	display: flex;
	font-size: 11px;
	justify-content: left;
	padding: 0.5em;
	word-wrap: break-word;
}

.card-main_card :global(table tr th) {
	text-align: center;
	font-weight: bold;
	color: var(--mid-grey);
}

.card-main_card :global(.card-editor) {
	text-align: right;
	color: var(--accent);
	font-size: small;
}

.card-main_card :global(.card-seccion) {
	display: flex;
	flex-direction: column;
	padding: 0.5em;
	border-bottom: 1px solid var(--light-grey);
}

.card-main_card :global(.card-seccion>*:not(:first-child)){
	margin-top: 1em;
}

.card-main_card :global(.card-seccion.last) {
	border: none;
}

.card-main_card :global(.card-seccion .titulo) {
	color: var(--mid-grey);
	font-weight: bold;
	font-size: small;
}

.card-main_card :global(.card-seccion .contenido) {
	color: var(--dark-grey);
}

.card-main_card :global(.card-seccion .nota) {
	color: var(--mid-grey);
	font-style: italic;
	font-size: small;
	margin-top: 0;
}

.card-main_card :global(.card-seccion select) {
	border: 1px solid var(--light-grey);
	padding: 0.5em;
}

.card-main_card :global(.card-seccion img) {
	border: 1px solid var(--light-grey);
	padding: 0.5em;
	max-width: 500px;
}

.card-main_card :global(.card-seccion img.free) {
	border: none;
	padding: 0px;
}

.card-main_card :global(.card-seccion textarea:focus),
.card-main_card :global(.card-seccion input:focus){
	outline: none;
}

.card-main_card :global(.card-seccion input[type="text"]),
.card-main_card :global(.card-seccion input[type="number"]),
.card-main_card :global(.card-seccion input[type="password"]) {
	/*resize: none;*/
	background-color: white;
	border-bottom: 1px solid var(--mid-grey);
	border-left: 0;
	border-right: 0;
	border-top: 0;
	box-sizing: border-box;
	color: var(--dark-grey);
	font-family: Trebuchet MS, sans-serif;
	font-size: small;
	padding: 0.5em;
	transition: all 0.25s;
}

.card-main_card :global(.card-seccion input[type="text"]:hover),
.card-main_card :global(.card-seccion input[type="text"]:focus),
.card-main_card :global(.card-seccion input[type="number"]:hover),
.card-main_card :global(.card-seccion input[type="number"]:focus),
.card-main_card :global(.card-seccion input[type="password"]:hover),
.card-main_card :global(.card-seccion input[type="password"]:focus) {
	border-bottom: 1px solid var(--accent);
}

.card-main_card :global(.card-seccion input[type="text"]:focus),
.card-main_card :global(.card-seccion input[type="number"]:focus),
.card-main_card :global(.card-seccion input[type="password"]:focus) {
	box-shadow: var(--default-shadow);
}

.card-main_card :global(.card-seccion textarea) {
	/*resize: none;*/
	background-color: white;
	border-bottom: 1px solid var(--mid-grey);
	border-left: 1px solid var(--mid-grey);
	border-right: 0;
	border-top: 0;
	box-sizing: border-box;
	color: var(--dark-grey);
	font-family: Trebuchet MS, sans-serif;
	font-size: small;
	padding: 0.5em;
	transition: all 0.25s, height 0s, width 0s;
}

.card-main_card :global(.card-seccion textarea:hover),
.card-main_card :global(.card-seccion textarea:focus) {
	border-left: 1px solid var(--accent);
	border-bottom: 1px solid var(--accent);
}

.card-main_card :global(.card-seccion textarea:focus) {
	box-shadow: var(--default-shadow);
}

.card-main_card :global(.card-seccion input[type="text"]:disabled),
.card-main_card :global(.card-seccion input[type="number"]:disabled),
.card-main_card :global(.card-seccion input[type="password"]:disabled),
.card-main_card :global(.card-seccion textarea:disabled) {
	background-color: var(--light-grey);
	border: none;
	cursor: not-allowed;
}

.card-main_card :global(.card-action_buttons) {
	display: flex;
	flex-direction: row;
	padding: 0.5em;
	justify-content: space-evenly;
}

.card-main_card :global(.card-action_buttons button) {
	padding: 0.5em 2em;
}

.card-main_card :global(.card-action_buttons .aceptar:hover),
.card-main_card :global(.card-action_buttons .aceptar:focus) {
	border: 1px solid var(--accent)
}

.card-main_card :global(.card-action_buttons .cancelar) {
	border-color: var(--red)
}







.card-main_card :global(button) {
	background-color: white;
	border: 1px solid var(--light-mid-grey);
	color: var(--mid-grey);
	cursor: pointer;
	display: inline-block;
	font-family: Trebuchet MS, sans-serif;
	font-size: smaller;
	margin-bottom: 0;
	margin-left: 0;
	margin-right: 0;
	margin-top: 0;
	padding-bottom: 0.2em;
	padding-left: 0.5em;
	padding-right: 0.5em;
	padding-top: 0.2em;
	transition: all 0.25s;
	text-align: center;
}

.card-main_card :global(button:hover),
.card-main_card :global(button:focus) {
	color: var(--dark-grey);
	box-shadow: var(--default-shadow);
}




.card-main_card :global(.radio-style-1) {
	display: inline-flex;
	align-items: center;
	justify-content: center;
/* 	overflow: hidden; */
	border-bottom: 1px solid var(--light-grey);
	border-top: 1px solid var(--light-grey);
/* 	border-radius: 15px; */
	font-size: small;
	transition: all 0.25s;
	flex-wrap: wrap;
}

.card-main_card :global(.radio-style-1:hover) {
	border-color: var(--accent);
}

.card-main_card :global(.radio-style-1 input) {
	display: none;
}

.card-main_card :global(.radio-style-1 label) {
	box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2);
	color: var(--light-mid-grey);
	transition: all 0.25s;
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: center;
}

.card-main_card :global(.radio-style-1 label:hover) {
	box-shadow: var(--default-shadow);
	color: var(--mid-grey);
	z-index: 1;
}

.card-main_card :global(.radio-style-1 span) {
	padding-top: 0.5em;
	padding-bottom: 0.5em;
	padding-left: 0.5em;
	padding-right: 0.5em;
	cursor: pointer;
	background-color: white;
	transition: all 0.25s;
}

.card-main_card :global(.radio-style-1 input:checked + span) {
	background-color: var(--accent);
	color: white;
}





.card-main_card :global(.radio-style-2) {
	display: inline-flex;
	align-items: center;
	justify-content: center;
/* 	overflow: hidden; */
	border-bottom: 1px solid var(--light-mid-grey);
/* 	border-radius: 15px; */
	font-size: small;
	flex-wrap: wrap;
	transition: all 0.25s;
}

.card-main_card :global(.radio-style-2:hover) {
	border-color: var(--mid-grey);
}

.card-main_card :global(.radio-style-2 input) {
	display: none;
}

.card-main_card :global(.radio-style-2 label) {
	color: var(--light-mid-grey);
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: center;
}

.card-main_card :global(.radio-style-2 label:hover) {
	color: var(--light-grey);
}

.card-main_card :global(.radio-style-2 span) {
	padding-top: 0.5em;
	padding-bottom: 0.5em;
	padding-left: 0.5em;
	padding-right: 0.5em;
	cursor: pointer;
	position: relative;
	transition: all 0.25s;
}

.card-main_card :global(.radio-style-2 label span::after) {
	position: absolute;
	background-color: var(--mid-grey);
	height: 0%;
	left: 0;
	right: 0;
	bottom: 0;
	content: "";
	z-index: -1;
	transition: all 0.25s;
}

.card-main_card :global(.radio-style-2 label:hover span::after) {
	height: 100%;
}

.card-main_card :global(.radio-style-2 input:checked + span) {
	background-color: var(--mid-grey);
	color: white;
}







.card-main_card :global(.info_popup) {
	font-size: 0.6em;
	border-radius: 1em;
	padding: 0;
	width: 1.6em;
	height: 1.6em;
	margin: 0.5em;
}





/* unvisited link */
.card-main_card :global(a:link) {
	color: var(--mid-grey);
	font-size: smaller;
	/*text-decoration: none;*/
	transition: color 0.25s;
}

/* visited link */
.card-main_card :global(a:visited) {
	color: var(--mid-grey);
	/*text-decoration: none;*/
}

/* mouse over link */
.card-main_card :global(a:hover),
.card-main_card :global(a:focus) {
	/*font-weight: bold;*/
	color: var(--dark-grey);
	/*text-decoration: none;*/
	transition: color 0.25s;
}

/* selected link */
.card-main_card :global(a:active) {
	color: var(--ligt-blue);
	/*text-decoration: none;*/
}
</style>