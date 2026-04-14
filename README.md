# Bot MESCyT

Sistema de chatbot conversacional basado en Dialogflow ES para MESCyT. Implementación completa con arquitectura limpia, gestión de configuración mediante variables de entorno y mapeo inteligente de intents a respuestas.

En la carpeta "jsons" haga un archivo llamado ```mescyt-bot-60e219bd63eb.json``` y pegue esto:

```json
{
  "type": "service_account",
  "project_id": "mescyt-bot",
  "private_key_id": "60e219bd63ebaddea3c4152444c262804760d4fb",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwhKqYMtx/h2LJ\n18S5JT8azigHWLy0bhb/4gKZNqGWT1mqlto4rMqJNJIkalrEX7ZHrKdc2/ZEZd6b\nqT0yJHr5db9+bwKEvQufI5/rzpIMy6A7w+h7dsfWB3rdrfuOXlSoB3EkdKk+QAIx\nj5zMVEgIPy1kMnu07wFYJlHlfSq+4rRuZam4GNPvT9nHSnlWda/AzLK0WaTB3GvR\n/QPBIbinyAfdVW/qnuUFC7Ajkz9+gA8wYJX5WMyOgJbJfewOoWcAGdu+pQ2Hl48m\n6lEukeelP1CYLADHEmMDRZYAzKHVTevrAPo3wEYdVDTtQCXLS67rrAlumbxhfGN7\nGGCgvdqxAgMBAAECggEAFBh2Z29a5PXfzETRM5bG8WFI81Up3oyt96GeVB0BFmCg\nP6h+3Xbmc+pVPOoSvUp8MPq57vtntO+4ARaqTdwTV/UMwPMYYU44VXyzxx+0Rtqj\nukoaXHvwUjB1z2jwO4wHrT1zpwfVAK4+0a+c1TI/JRk0LLUGmlmfWI68QhkW1bY/\nFwsqqUOaF+0O5W1sIBeH84fnOJxKBuToLF1hSETphk80nqkwFu3eZOoAhEBtkyM5\nbHgZVdSxTwyVStBiuNjSEVM6RxO2dwV7bgYXvOwuldn5+dVAMprbX0JNoUl5Ck4D\nhUATLkyo92YVRPecd7YX1Fl6zTgdh1/lEpeMt2GHdQKBgQDWVv5jXFDW8PI1Rc1x\nF7HVZu8MHsA2sw9gnmMBGUjPb6C7oaezFh22kYmyQvMJ8BbTfmFu5q/E9IujcQhj\n/bkJa/AdqHBOWaM9rEPCFyVUYlFK9CzYBak7+M6dwQ379ta5YZLVWpraZVP9I7XA\npfx7dkt07EFgnznwnyt7A7l2DwKBgQDS08Qh8GBav+D+fSd5WndnpQxBLO5UYua9\nrpcbIcjcNSSxSSt25hLbqhWNQe+UCA2Z/pjOsC9Aoup5SPYUSkrpbbB/mDavGK7S\nTWjordC2vRg7PfrnSyuqqCNspgZHloMTRQ+Q5hKb2yswB/UxUuy99boYI66O5p2Q\nuljdjW5jPwKBgQC+xpeOILDjX3p16Dc/nfNvGjtS8lvrU90wBkngxHyGBbluyCfX\nwquXwFprDCP+iHAItshKSZHRIEjZpNXvCfoUZLpH65BqbGZbkmSM8MUNIqVwrXzs\nmb1T39UnnJmx1rawMiTbOdXy5ZWoDozLd/IOgfAPlelq8s5DWaj9yQbeCQKBgDzs\n26IfMAkpqCCDFHQ6U4VNKgRvspQKXLn2CU7a7YvNg8QD7B6ZEFwQg9fldRGnXh7h\nd1FLkuwv6GiSUCK+8XURsM6+sxbYoDTAEBAlosocTTNZjvdmPsE7g7kzJV9svIZG\nD+CEzF3j8VAZDJ9rYmTm7RdqwFglhuU7JNEpvPvLAoGAOhia6NuLYMvO/fX637zL\npFlJ1xYcanF6WGty0v1K9r52NDO+nKDNn+p9XpJXRdqBI6sNc1bKoVoaGcBPB8Br\nPN+VpqceBbc3fvqA3IJHxynAbzkScB6LdGa8o8DIfbVCVI8eLXpXKtgPy07tH6RD\nuIUmW3Y7p+xj2SgYlnlLoBc=\n-----END PRIVATE KEY-----\n",
  "client_email": "mescyt-bot-ia@mescyt-bot.iam.gserviceaccount.com",
  "client_id": "113843797132544780657",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/mescyt-bot-ia%40mescyt-bot.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
```

Y el ```.env``` :

```env
PORT=3000
NODE_ENV=development
GOOGLE_PROJECT_ID=mescyt-bot-bonk
GOOGLE_CLIENT_EMAIL=mescyt-bot-ia@mescyt-bot.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwhKqYMtx/h2LJ\n18S5JT8azigHWLy0bhb/4gKZNqGWT1mqlto4rMqJNJIkalrEX7ZHrKdc2/ZEZd6b\nqT0yJHr5db9+bwKEvQufI5/rzpIMy6A7w+h7dsfWB3rdrfuOXlSoB3EkdKk+QAIx\nj5zMVEgIPy1kMnu07wFYJlHlfSq+4rRuZam4GNPvT9nHSnlWda/AzLK0WaTB3GvR\n/QPBIbinyAfdVW/qnuUFC7Ajkz9+gA8wYJX5WMyOgJbJfewOoWcAGdu+pQ2Hl48m\n6lEukeelP1CYLADHEmMDRZYAzKHVTevrAPo3wEYdVDTtQCXLS67rrAlumbxhfGN7\nGGCgvdqxAgMBAAECggEAFBh2Z29a5PXfzETRM5bG8WFI81Up3oyt96GeVB0BFmCg\nP6h+3Xbmc+pVPOoSvUp8MPq57vtntO+4ARaqTdwTV/UMwPMYYU44VXyzxx+0Rtqj\nukoaXHvwUjB1z2jwO4wHrT1zpwfVAK4+0a+c1TI/JRk0LLUGmlmfWI68QhkW1bY/\nFwsqqUOaF+0O5W1sIBeH84fnOJxKBuToLF1hSETphk80nqkwFu3eZOoAhEBtkyM5\nbHgZVdSxTwyVStBiuNjSEVM6RxO2dwV7bgYXvOwuldn5+dVAMprbX0JNoUl5Ck4D\nhUATLkyo92YVRPecd7YX1Fl6zTgdh1/lEpeMt2GHdQKBgQDWVv5jXFDW8PI1Rc1x\nF7HVZu8MHsA2sw9gnmMBGUjPb6C7oaezFh22kYmyQvMJ8BbTfmFu5q/E9IujcQhj\n/bkJa/AdqHBOWaM9rEPCFyVUYlFK9CzYBak7+M6dwQ379ta5YZLVWpraZVP9I7XA\npfx7dkt07EFgnznwnyt7A7l2DwKBgQDS08Qh8GBav+D+fSd5WndnpQxBLO5UYua9\nrpcbIcjcNSSxSSt25hLbqhWNQe+UCA2Z/pjOsC9Aoup5SPYUSkrpbbB/mDavGK7S\nTWjordC2vRg7PfrnSyuqqCNspgZHloMTRQ+Q5hKb2yswB/UxUuy99boYI66O5p2Q\nuljdjW5jPwKBgQC+xpeOILDjX3p16Dc/nfNvGjtS8lvrU90wBkngxHyGBbluyCfX\nwquXwFprDCP+iHAItshKSZHRIEjZpNXvCfoUZLpH65BqbGZbkmSM8MUNIqVwrXzs\nmb1T39UnnJmx1rawMiTbOdXy5ZWoDozLd/IOgfAPlelq8s5DWaj9yQbeCQKBgDzs\n26IfMAkpqCCDFHQ6U4VNKgRvspQKXLn2CU7a7YvNg8QD7B6ZEFwQg9fldRGnXh7h\nd1FLkuwv6GiSUCK+8XURsM6+sxbYoDTAEBAlosocTTNZjvdmPsE7g7kzJV9svIZG\nD+CEzF3j8VAZDJ9rYmTm7RdqwFglhuU7JNEpvPvLAoGAOhia6NuLYMvO/fX637zL\npFlJ1xYcanF6WGty0v1K9r52NDO+nKDNn+p9XpJXRdqBI6sNc1bKoVoaGcBPB8Br\nPN+VpqceBbc3fvqA3IJHxynAbzkScB6LdGa8o8DIfbVCVI8eLXpXKtgPy07tH6RD\nuIUmW3Y7p+xj2SgYlnlLoBc=\n-----END PRIVATE KEY-----\n
DIALOGFLOW_SESSION_ID=sesion-test-123456
DIALOGFLOW_LANGUAGE_CODE=es-ES

```
