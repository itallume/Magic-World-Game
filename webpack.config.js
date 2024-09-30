module.exports = {
    module: {
      rules: [
        {
          test: /\.(mp3|wav)$/, // Para arquivos de áudio
          use: {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]', // Opções para a saída do arquivo
            },
          },
        },
        // Outras regras que já existam
      ],
    },
  };