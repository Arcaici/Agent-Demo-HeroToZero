### **1. L'Illusionista e il Motore (Partire da Copilot)**

*Obiettivo: Sfatare l'hype e introdurre il cambio di paradigma.*

* **L'automobile e il motore:** Copilot (o ChatGPT) come prodotto finito con interfaccia, permessi e dati; l'LLM come il "motore" sottostante.
* **Dal determinismo alla probabilità:** Lo shock culturale per l'IT. Passare dalla logica `if-A-then-B` al calcolo statistico della *Next Token Prediction*.

### **2. Anatomia Pratica del Motore (LLM e Parametri)**

*Obiettivo: Rendere l'LLM comprensibile come componente software.*

* **Non è un database:** Come avviene l'addestramento (compressione dei pattern linguistici nei pesi, non memorizzazione di righe SQL).
* **La Context Window come RAM:** Il concetto di modello *stateless* e la necessità di re-iniettare il contesto a ogni chiamata (e i limiti fisici dei token).
* **Le leve di controllo:** Spiegare *Temperature*, *System Prompt* e vettori/embedding come spazio semantico.

### **3. L'Integrazione e la Conoscenza (Oltre i limiti del modello)**

*Obiettivo: Risolvere il problema dell'aggiornamento e dei dati aziendali.*

* **In-Context Learning:** Come sfruttare la RAM del modello a runtime.
* **RAG (Retrieval-Augmented Generation):** Dare accesso ai documenti aziendali senza riaddestrare.
* **Evoluzioni del RAG:** Accenno a pattern avanzati (es. integrazione con Knowledge Graphs o Time-Aware RAG) per dati complessi.

### **4. L'Azione: Dalla Chat all'Agente (L'Orchestrazione)**

*Obiettivo: Spiegare come l'LLM smette di essere passivo e compie azioni.*

* **Function Calling / Tool Use:** Il punto di svolta. L'LLM che genera payload JSON strutturati per interrogare API, CRM o eseguire script.
* **Il Loop dell'Agente:** Come strutturare il ciclo *Observe -> Reason -> Act* in codice (Python/TypeScript).
* **Sistemi Multi-Agente:** Quando un singolo agente non basta e si orchestrano più istanze con ruoli specializzati (es. pianificatore, esecutore, revisore).

### **5. Sicurezza e Sfide Architetturali**

*Obiettivo: Preparare l'IT ai rischi concreti di queste architetture.*

* **Mitigare le Allucinazioni:** Strategie di system prompt e validazione degli output.
* **AI Red Teaming & Sicurezza:** Vulnerabilità critiche come la *Prompt Injection* (OWASP Top 10 per LLM), data poisoning e tecniche di probing dei prompt.