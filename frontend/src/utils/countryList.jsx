const countryList = [
    {
        value: "Aruba",
        label: "Aruba"
    },
    {
        value: "Afghanistan",
        label: "Afghanistan"
    },
    {
        value: "Angola",
        label: "Angola"
    },
    {
        value: "Anguilla",
        label: "Anguilla"
    },
    {
        value: "Åland Islands",
        label: "Åland Islands"
    },
    {
        value: "Albania",
        label: "Albania"
    },
    {
        value: "Andorra",
        label: "Andorra"
    },
    {
        value: "United Arab Emirates",
        label: "United Arab Emirates"
    },
    {
        value: "Argentina",
        label: "Argentina"
    },
    {
        value: "Armenia",
        label: "Armenia"
    },
    {
        value: "American Samoa",
        label: "American Samoa"
    },
    {
        value: "Antarctica",
        label: "Antarctica"
    },
    {
        value: "French Southern and Antarctic Lands",
        label: "French Southern and Antarctic Lands"
    },
    {
        value: "Antigua and Barbuda",
        label: "Antigua and Barbuda"
    },
    {
        value: "Australia",
        label: "Australia"
    },
    {
        value: "Austria",
        label: "Austria"
    },
    {
        value: "Azerbaijan",
        label: "Azerbaijan"
    },
    {
        value: "Burundi",
        label: "Burundi"
    },
    {
        value: "Belgium",
        label: "Belgium"
    },
    {
        value: "Benin",
        label: "Benin"
    },
    {
        value: "Burkina Faso",
        label: "Burkina Faso"
    },
    {
        value: "Bangladesh",
        label: "Bangladesh"
    },
    {
        value: "Bulgaria",
        label: "Bulgaria"
    },
    {
        value: "Bahrain",
        label: "Bahrain"
    },
    {
        value: "Bahamas",
        label: "Bahamas"
    },
    {
        value: "Bosnia and Herzegovina",
        label: "Bosnia and Herzegovina"
    },
    {
        value: "Saint Barthélemy",
        label: "Saint Barthélemy"
    },
    {
        value: "Saint Helena, Ascension and Tristan da Cunha",
        label: "Saint Helena, Ascension and Tristan da Cunha"
    },
    {
        value: "Belarus",
        label: "Belarus"
    },
    {
        value: "Belize",
        label: "Belize"
    },
    {
        value: "Bermuda",
        label: "Bermuda"
    },
    {
        value: "Bolivia",
        label: "Bolivia"
    },
    {
        value: "Caribbean Netherlands",
        label: "Caribbean Netherlands"
    },
    {
        value: "Brazil",
        label: "Brazil"
    },
    {
        value: "Barbados",
        label: "Barbados"
    },
    {
        value: "Brunei",
        label: "Brunei"
    },
    {
        value: "Bhutan",
        label: "Bhutan"
    },
    {
        value: "Bouvet Island",
        label: "Bouvet Island"
    },
    {
        value: "Botswana",
        label: "Botswana"
    },
    {
        value: "Central African Republic",
        label: "Central African Republic"
    },
    {
        value: "Canada",
        label: "Canada"
    },
    {
        value: "Cocos (Keeling) Islands",
        label: "Cocos (Keeling) Islands"
    },
    {
        value: "Switzerland",
        label: "Switzerland"
    },
    {
        value: "Chile",
        label: "Chile"
    },
    {
        value: "China",
        label: "China"
    },
    {
        value: "Ivory Coast",
        label: "Ivory Coast"
    },
    {
        value: "Cameroon",
        label: "Cameroon"
    },
    {
        value: "DR Congo",
        label: "DR Congo"
    },
    {
        value: "Republic of the Congo",
        label: "Republic of the Congo"
    },
    {
        value: "Cook Islands",
        label: "Cook Islands"
    },
    {
        value: "Colombia",
        label: "Colombia"
    },
    {
        value: "Comoros",
        label: "Comoros"
    },
    {
        value: "Cape Verde",
        label: "Cape Verde"
    },
    {
        value: "Costa Rica",
        label: "Costa Rica"
    },
    {
        value: "Cuba",
        label: "Cuba"
    },
    {
        value: "Curaçao",
        label: "Curaçao"
    },
    {
        value: "Christmas Island",
        label: "Christmas Island"
    },
    {
        value: "Cayman Islands",
        label: "Cayman Islands"
    },
    {
        value: "Cyprus",
        label: "Cyprus"
    },
    {
        value: "Czechia",
        label: "Czechia"
    },
    {
        value: "Germany",
        label: "Germany"
    },
    {
        value: "Djibouti",
        label: "Djibouti"
    },
    {
        value: "Dominica",
        label: "Dominica"
    },
    {
        value: "Denmark",
        label: "Denmark"
    },
    {
        value: "Dominican Republic",
        label: "Dominican Republic"
    },
    {
        value: "Algeria",
        label: "Algeria"
    },
    {
        value: "Ecuador",
        label: "Ecuador"
    },
    {
        value: "Egypt",
        label: "Egypt"
    },
    {
        value: "Eritrea",
        label: "Eritrea"
    },
    {
        value: "Western Sahara",
        label: "Western Sahara"
    },
    {
        value: "Spain",
        label: "Spain"
    },
    {
        value: "Estonia",
        label: "Estonia"
    },
    {
        value: "Ethiopia",
        label: "Ethiopia"
    },
    {
        value: "Finland",
        label: "Finland"
    },
    {
        value: "Fiji",
        label: "Fiji"
    },
    {
        value: "Falkland Islands",
        label: "Falkland Islands"
    },
    {
        value: "France",
        label: "France"
    },
    {
        value: "Faroe Islands",
        label: "Faroe Islands"
    },
    {
        value: "Micronesia",
        label: "Micronesia"
    },
    {
        value: "Gabon",
        label: "Gabon"
    },
    {
        value: "United Kingdom",
        label: "United Kingdom"
    },
    {
        value: "Georgia",
        label: "Georgia"
    },
    {
        value: "Guernsey",
        label: "Guernsey"
    },
    {
        value: "Ghana",
        label: "Ghana"
    },
    {
        value: "Gibraltar",
        label: "Gibraltar"
    },
    {
        value: "Guinea",
        label: "Guinea"
    },
    {
        value: "Guadeloupe",
        label: "Guadeloupe"
    },
    {
        value: "Gambia",
        label: "Gambia"
    },
    {
        value: "Guinea-Bissau",
        label: "Guinea-Bissau"
    },
    {
        value: "Equatorial Guinea",
        label: "Equatorial Guinea"
    },
    {
        value: "Greece",
        label: "Greece"
    },
    {
        value: "Grenada",
        label: "Grenada"
    },
    {
        value: "Greenland",
        label: "Greenland"
    },
    {
        value: "Guatemala",
        label: "Guatemala"
    },
    {
        value: "French Guiana",
        label: "French Guiana"
    },
    {
        value: "Guam",
        label: "Guam"
    },
    {
        value: "Guyana",
        label: "Guyana"
    },
    {
        value: "Hong Kong",
        label: "Hong Kong"
    },
    {
        value: "Heard Island and McDonald Islands",
        label: "Heard Island and McDonald Islands"
    },
    {
        value: "Honduras",
        label: "Honduras"
    },
    {
        value: "Croatia",
        label: "Croatia"
    },
    {
        value: "Haiti",
        label: "Haiti"
    },
    {
        value: "Hungary",
        label: "Hungary"
    },
    {
        value: "Indonesia",
        label: "Indonesia"
    },
    {
        value: "Isle of Man",
        label: "Isle of Man"
    },
    {
        value: "India",
        label: "India"
    },
    {
        value: "British Indian Ocean Territory",
        label: "British Indian Ocean Territory"
    },
    {
        value: "Ireland",
        label: "Ireland"
    },
    {
        value: "Iran",
        label: "Iran"
    },
    {
        value: "Iraq",
        label: "Iraq"
    },
    {
        value: "Iceland",
        label: "Iceland"
    },
    {
        value: "Israel",
        label: "Israel"
    },
    {
        value: "Italy",
        label: "Italy"
    },
    {
        value: "Jamaica",
        label: "Jamaica"
    },
    {
        value: "Jersey",
        label: "Jersey"
    },
    {
        value: "Jordan",
        label: "Jordan"
    },
    {
        value: "Japan",
        label: "Japan"
    },
    {
        value: "Kazakhstan",
        label: "Kazakhstan"
    },
    {
        value: "Kenya",
        label: "Kenya"
    },
    {
        value: "Kyrgyzstan",
        label: "Kyrgyzstan"
    },
    {
        value: "Cambodia",
        label: "Cambodia"
    },
    {
        value: "Kiribati",
        label: "Kiribati"
    },
    {
        value: "Saint Kitts and Nevis",
        label: "Saint Kitts and Nevis"
    },
    {
        value: "South Korea",
        label: "South Korea"
    },
    {
        value: "Kosovo",
        label: "Kosovo"
    },
    {
        value: "Kuwait",
        label: "Kuwait"
    },
    {
        value: "Laos",
        label: "Laos"
    },
    {
        value: "Lebanon",
        label: "Lebanon"
    },
    {
        value: "Liberia",
        label: "Liberia"
    },
    {
        value: "Libya",
        label: "Libya"
    },
    {
        value: "Saint Lucia",
        label: "Saint Lucia"
    },
    {
        value: "Liechtenstein",
        label: "Liechtenstein"
    },
    {
        value: "Sri Lanka",
        label: "Sri Lanka"
    },
    {
        value: "Lesotho",
        label: "Lesotho"
    },
    {
        value: "Lithuania",
        label: "Lithuania"
    },
    {
        value: "Luxembourg",
        label: "Luxembourg"
    },
    {
        value: "Latvia",
        label: "Latvia"
    },
    {
        value: "Macau",
        label: "Macau"
    },
    {
        value: "Saint Martin",
        label: "Saint Martin"
    },
    {
        value: "Morocco",
        label: "Morocco"
    },
    {
        value: "Monaco",
        label: "Monaco"
    },
    {
        value: "Moldova",
        label: "Moldova"
    },
    {
        value: "Madagascar",
        label: "Madagascar"
    },
    {
        value: "Maldives",
        label: "Maldives"
    },
    {
        value: "Mexico",
        label: "Mexico"
    },
    {
        value: "Marshall Islands",
        label: "Marshall Islands"
    },
    {
        value: "North Macedonia",
        label: "North Macedonia"
    },
    {
        value: "Mali",
        label: "Mali"
    },
    {
        value: "Malta",
        label: "Malta"
    },
    {
        value: "Myanmar",
        label: "Myanmar"
    },
    {
        value: "Montenegro",
        label: "Montenegro"
    },
    {
        value: "Mongolia",
        label: "Mongolia"
    },
    {
        value: "Northern Mariana Islands",
        label: "Northern Mariana Islands"
    },
    {
        value: "Mozambique",
        label: "Mozambique"
    },
    {
        value: "Mauritania",
        label: "Mauritania"
    },
    {
        value: "Montserrat",
        label: "Montserrat"
    },
    {
        value: "Martinique",
        label: "Martinique"
    },
    {
        value: "Mauritius",
        label: "Mauritius"
    },
    {
        value: "Malawi",
        label: "Malawi"
    },
    {
        value: "Malaysia",
        label: "Malaysia"
    },
    {
        value: "Mayotte",
        label: "Mayotte"
    },
    {
        value: "Namibia",
        label: "Namibia"
    },
    {
        value: "New Caledonia",
        label: "New Caledonia"
    },
    {
        value: "Niger",
        label: "Niger"
    },
    {
        value: "Norfolk Island",
        label: "Norfolk Island"
    },
    {
        value: "Nigeria",
        label: "Nigeria"
    },
    {
        value: "Nicaragua",
        label: "Nicaragua"
    },
    {
        value: "Niue",
        label: "Niue"
    },
    {
        value: "Netherlands",
        label: "Netherlands"
    },
    {
        value: "Norway",
        label: "Norway"
    },
    {
        value: "Nepal",
        label: "Nepal"
    },
    {
        value: "Nauru",
        label: "Nauru"
    },
    {
        value: "New Zealand",
        label: "New Zealand"
    },
    {
        value: "Oman",
        label: "Oman"
    },
    {
        value: "Pakistan",
        label: "Pakistan"
    },
    {
        value: "Panama",
        label: "Panama"
    },
    {
        value: "Pitcairn Islands",
        label: "Pitcairn Islands"
    },
    {
        value: "Peru",
        label: "Peru"
    },
    {
        value: "Philippines",
        label: "Philippines"
    },
    {
        value: "Palau",
        label: "Palau"
    },
    {
        value: "Papua New Guinea",
        label: "Papua New Guinea"
    },
    {
        value: "Poland",
        label: "Poland"
    },
    {
        value: "Puerto Rico",
        label: "Puerto Rico"
    },
    {
        value: "North Korea",
        label: "North Korea"
    },
    {
        value: "Portugal",
        label: "Portugal"
    },
    {
        value: "Paraguay",
        label: "Paraguay"
    },
    {
        value: "Palestine",
        label: "Palestine"
    },
    {
        value: "French Polynesia",
        label: "French Polynesia"
    },
    {
        value: "Qatar",
        label: "Qatar"
    },
    {
        value: "Réunion",
        label: "Réunion"
    },
    {
        value: "Romania",
        label: "Romania"
    },
    {
        value: "Russia",
        label: "Russia"
    },
    {
        value: "Rwanda",
        label: "Rwanda"
    },
    {
        value: "Saudi Arabia",
        label: "Saudi Arabia"
    },
    {
        value: "Sudan",
        label: "Sudan"
    },
    {
        value: "Senegal",
        label: "Senegal"
    },
    {
        value: "Singapore",
        label: "Singapore"
    },
    {
        value: "South Georgia",
        label: "South Georgia"
    },
    {
        value: "Svalbard and Jan Mayen",
        label: "Svalbard and Jan Mayen"
    },
    {
        value: "Solomon Islands",
        label: "Solomon Islands"
    },
    {
        value: "Sierra Leone",
        label: "Sierra Leone"
    },
    {
        value: "El Salvador",
        label: "El Salvador"
    },
    {
        value: "San Marino",
        label: "San Marino"
    },
    {
        value: "Somalia",
        label: "Somalia"
    },
    {
        value: "Saint Pierre and Miquelon",
        label: "Saint Pierre and Miquelon"
    },
    {
        value: "Serbia",
        label: "Serbia"
    },
    {
        value: "South Sudan",
        label: "South Sudan"
    },
    {
        value: "São Tomé and Príncipe",
        label: "São Tomé and Príncipe"
    },
    {
        value: "Suriname",
        label: "Suriname"
    },
    {
        value: "Slovakia",
        label: "Slovakia"
    },
    {
        value: "Slovenia",
        label: "Slovenia"
    },
    {
        value: "Sweden",
        label: "Sweden"
    },
    {
        value: "Eswatini",
        label: "Eswatini"
    },
    {
        value: "Sint Maarten",
        label: "Sint Maarten"
    },
    {
        value: "Seychelles",
        label: "Seychelles"
    },
    {
        value: "Syria",
        label: "Syria"
    },
    {
        value: "Turks and Caicos Islands",
        label: "Turks and Caicos Islands"
    },
    {
        value: "Chad",
        label: "Chad"
    },
    {
        value: "Togo",
        label: "Togo"
    },
    {
        value: "Thailand",
        label: "Thailand"
    },
    {
        value: "Tajikistan",
        label: "Tajikistan"
    },
    {
        value: "Tokelau",
        label: "Tokelau"
    },
    {
        value: "Turkmenistan",
        label: "Turkmenistan"
    },
    {
        value: "Timor-Leste",
        label: "Timor-Leste"
    },
    {
        value: "Tonga",
        label: "Tonga"
    },
    {
        value: "Trinidad and Tobago",
        label: "Trinidad and Tobago"
    },
    {
        value: "Tunisia",
        label: "Tunisia"
    },
    {
        value: "Turkey",
        label: "Turkey"
    },
    {
        value: "Tuvalu",
        label: "Tuvalu"
    },
    {
        value: "Taiwan",
        label: "Taiwan"
    },
    {
        value: "Tanzania",
        label: "Tanzania"
    },
    {
        value: "Uganda",
        label: "Uganda"
    },
    {
        value: "Ukraine",
        label: "Ukraine"
    },
    {
        value: "United States Minor Outlying Islands",
        label: "United States Minor Outlying Islands"
    },
    {
        value: "Uruguay",
        label: "Uruguay"
    },
    {
        value: "United States",
        label: "United States"
    },
    {
        value: "Uzbekistan",
        label: "Uzbekistan"
    },
    {
        value: "Vatican City",
        label: "Vatican City"
    },
    {
        value: "Saint Vincent and the Grenadines",
        label: "Saint Vincent and the Grenadines"
    },
    {
        value: "Venezuela",
        label: "Venezuela"
    },
    {
        value: "British Virgin Islands",
        label: "British Virgin Islands"
    },
    {
        value: "United States Virgin Islands",
        label: "United States Virgin Islands"
    },
    {
        value: "Vietnam",
        label: "Vietnam"
    },
    {
        value: "Vanuatu",
        label: "Vanuatu"
    },
    {
        value: "Wallis and Futuna",
        label: "Wallis and Futuna"
    },
    {
        value: "Samoa",
        label: "Samoa"
    },
    {
        value: "Yemen",
        label: "Yemen"
    },
    {
        value: "South Africa",
        label: "South Africa"
    },
    {
        value: "Zambia",
        label: "Zambia"
    },
    {
        value: "Zimbabwe",
        label: "Zimbabwe"
    }
]

export default countryList