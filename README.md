# InstaBad

Faça o clone no projeto na sua maquina, utilizando o git clone <url_do_projeto>

Instale o Homebrew caso você esteja usando o Mac, instale o node e o watchman, caso esteja em outro sistema operacional a necessidade de instalar o node e watchman para conseguir executar o apicativo.

brew install node
brew install watchman

Instale o react-native-cli: 

npm install -g react-native-cli

instale as dependencias do projeto:

npm install

E importante que você tenha o Android Studio instalado ou Xcode para executar o apicativo.

Antes de executar de fato o aplicativo utilize o comando:

react-native link 

para efetuar o link das dependencias do React Native com o projeto Android/iOs

Apôs isso abra o android estudio e veja e espero o gradle terminar de executar, caso de algum problema você tera que efetuar algumas configurações na mão como subistituir o "compile" para "implementation".