float zero_senseur; 
int PIN_ACS712 = A0;
int count = 0;
unsigned long last_send;

// Obtient la valeur du senseur de courant ACS712
//
// Effectue plusieurs lecture et calcule la moyenne pour pondérer
// la valeur obtenue.
float valeurACS712( int pin ){
  int valeur;
  float moyenne = 0;
  
  int nbr_lectures = 50;
  for( int i = 0; i < nbr_lectures; i++ ){
      valeur = analogRead( pin );
      moyenne = moyenne + float(valeur);
  }
  moyenne = moyenne / float(nbr_lectures);
  return moyenne;
}

void setup(){
  // calibration du senseur  (SANS COURANT)
  zero_senseur = valeurACS712( PIN_ACS712 );
  last_send = millis();
  Serial.begin( 9600 );
}

float courant; 
float courant_efficace;     
float tension_efficace = 230; // tension efficace du réseau electrique
float puissance_efficace; 
float ACS712_RAPPORT = 66; // nbr de millivolts par ampère

void loop(){
  float valeur_senseur = valeurACS712( PIN_ACS712 );
  // L'amplitude en courant est ici retournée en mA
  // plus confortable pour les calculs
  courant = (float)(valeur_senseur-zero_senseur)/1024*5/ACS712_RAPPORT*100000;
  // Courant efficace en mA
  courant_efficace = courant / 1.414; // divisé par racine de 2

  // Calcul de la puissance.
  //    On divise par 1000 pour transformer les mA en Ampère
  puissance_efficace += (courant_efficace * tension_efficace/1000);
  count++;

  if(last_send + 20000 < millis()){
    float p = puissance_efficace / count;
    Serial.println(p);
    puissance_efficace = 0;
    count = 0;
    last_send = millis();
  }
  
  delay( 1000 ); // attendre une seconde 
}
