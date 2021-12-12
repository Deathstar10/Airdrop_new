const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
   } = require("@solana/web3.js");


const newPair = new Keypair();
console.log(newPair);

// every wallet has 2 components public- used to receive crypto and private key
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey

// Obtain balance from the crypto wallet
const getWalletBalance = async() => {
    try{
        // Solana has main-net and its clone called devnet
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        // create a wallet object from the secretKey
        const myWallet = Keypair.fromSecretKey(secretKey)

        const WalletBalance = await connection.getBalance(
            new PublicKey(myWallet.publicKey)
        );
        console.log(`=> For wallet address ${publicKey}`);
        console.log(`   Wallet balance: ${parseInt(WalletBalance)/LAMPORTS_PER_SOL}SOL`);
    } catch(err){
        console.log(err);
    }
};

const airDropSol = async() => {
    try{
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        const walletKeyPair = Keypair.fromSecretKey(secretKey);
        console.log(`-- Airdropping 5 SOL --`);
        const airDropSignature = await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(airDropSignature);
    } catch(err){
        console.log(err);
    }
};

const driverFunction = async() => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}
driverFunction();





