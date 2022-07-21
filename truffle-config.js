/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 * truffle run verify PhotoNFTData --network bsctestnet --License MIT
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config()
const MNEMONIC = "rule lemon smile curtain april hundred grace mind question song cousin write"
module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */
  api_keys: {
    bscscan: 'IMM4ABGFWDS8E1XGB66GQZGRQND4FQNPH1',
    etherscan: 'BXQ1U6QUC3WUN7SXRQA1J6ETXWAB2CNI54',
    polygonscan: 'KQ5VX6W4DUM32XJ8VT88Z8URG1ATP7BFME'
  },
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      gas: 5000000,
      network_id: "*", // Match any network id
    },
    kcc: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://rpc-testnet.kcc.network`),
      network_id: 322,
      networkCheckTimeout: 1000000,
      confirmations: 2,
      timeoutBlocks: 4000,
      skipDryRun: true,
    },
    rinkeby: {
      provider: () => new HDWalletProvider(MNEMONIC, `wss://rinkeby.infura.io/ws/v3/7db2645626cf44589cf37e95f8aa61ec`),
      network_id: 4,
      networkCheckTimeout: 1000000,
      confirmations: 2,
      timeoutBlocks: 4000,
      skipDryRun: true,
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(MNEMONIC, `wss://ropsten.infura.io/ws/v3/7db2645626cf44589cf37e95f8aa61ec`);
      },
      networkCheckTimeout: 1000000,
      network_id: 3,
      confirmations: 2,
      timeoutBlocks: 4000,
      skipDryRun: true,
    },
    ethereum: {
      provider: function () {
        return new HDWalletProvider(MNEMONIC, `wss://mainnet.infura.io/ws/v3/7db2645626cf44589cf37e95f8aa61ec`);
      },
      network_id: 1,
      networkCheckTimeout: 1000000,
      confirmations: 2,
      timeoutBlocks: 4000,
      skipDryRun: true,
    },
    polygon: {
      provider: function () {
        return new HDWalletProvider(MNEMONIC, `wss://speedy-nodes-nyc.moralis.io/2c7dbf705635580af512f432/polygon/mainnet/ws`);
      },
      network_id: 137,
      networkCheckTimeout: 1000000,
      confirmations: 2,
      timeoutBlocks: 4000,
      skipDryRun: true,
    },
    bsc: {
      provider: function () {
        return new HDWalletProvider(MNEMONIC, `https://bsc-dataseed.binance.org/`);
      },
      network_id: 56,
      networkCheckTimeout: 1000000,
      confirmations: 2,
      timeoutBlocks: 4000,
      skipDryRun: true,
    },
    bsctestnet: {
      provider: function () {
        return new HDWalletProvider(MNEMONIC, `https://data-seed-prebsc-1-s1.binance.org:8545/`);
      },
      network_id: 97,
      networkCheckTimeout: 1000000,
      confirmations: 2,
      timeoutBlocks: 4000,
      skipDryRun: true,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8",    // Fetch exact version from solc-bin (default: truffle's version)
      docker: false,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled: false to enabled: true
  //
  // Note: if you migrated your contracts prior to enabling this field in your Truffle project and want
  // those previously migrated contracts available in the .db directory, you will need to run the following:
  // $ truffle migrate --reset --compile-all

  db: {
    enabled: false
  },
  plugins: [
    'truffle-plugin-verify'
  ]
};
