const nextConfig = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(mp3|wav)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      });
  
      return config;
    },
  };
  
  export default nextConfig;
  
