import { BigInt, ethereum } from '@graphprotocol/graph-ts';
import * as vault from '../generated/Vault/Vault';
import * as vlpManager from '../generated/VlpManager/VlpManager';
import * as rewardRouter from '../generated/RewardRouterV2/RewardRouterV2';
import {
  CollectMarginFee,
  CollectSwapFee,
  AddLiquidity,
  RemoveLiquidity,
  IncreasePosition,
  DecreasePosition,
  LiquidatePosition,
  ClosePosition,
  Transaction,
  Swap,
  StakeVwave,
  UnstakeVwave,
  StakeVlp,
  UnstakeVlp,
} from '../generated/schema';

function _createTransactionIfNotExist(event: ethereum.Event): string {
  let id = event.transaction.hash.toHexString();
  let entity = Transaction.load(id);

  if (entity == null) {
    entity = new Transaction(id);
    entity.timestamp = event.block.timestamp.toI32();
    entity.blockNumber = event.block.number.toI32();
    entity.from = event.transaction.from.toHexString();
    entity.to = event.transaction.to.toHexString();
    entity.save();
  }

  return id;
}

export function handleLiquidatePosition(event: vault.LiquidatePosition): void {
  let id = event.transaction.hash.toHexString();
  let entity = new LiquidatePosition(id);

  entity.key = event.params.key.toHexString();
  entity.account = event.params.account.toHexString();
  entity.collateralToken = event.params.collateralToken.toHexString();
  entity.indexToken = event.params.indexToken.toHexString();
  entity.isLong = event.params.isLong;
  entity.size = event.params.size;
  entity.collateral = event.params.collateral;
  entity.reserveAmount = event.params.reserveAmount;
  entity.realisedPnl = event.params.realisedPnl;
  entity.markPrice = event.params.markPrice;

  entity.transaction = _createTransactionIfNotExist(event);
  entity.timestamp = event.block.timestamp.toI32();

  entity.save();
}

export function handleClosePosition(event: vault.ClosePosition): void {
  let id = event.transaction.hash.toHexString();
  let entity = new ClosePosition(id);

  entity.key = event.params.key.toHexString();
  entity.size = event.params.size;
  entity.collateral = event.params.collateral;
  entity.averagePrice = event.params.averagePrice;
  entity.entryFundingRate = event.params.entryFundingRate;
  entity.reserveAmount = event.params.reserveAmount;
  entity.realisedPnl = event.params.realisedPnl;

  entity.transaction = _createTransactionIfNotExist(event);
  entity.timestamp = event.block.timestamp.toI32();

  entity.save();
}

export function handleIncreasePosition(event: vault.IncreasePosition): void {
  let id = event.transaction.hash.toHexString();
  let entity = new IncreasePosition(id);

  entity.key = event.params.key.toHexString();
  entity.account = event.params.account.toHexString();
  entity.collateralToken = event.params.collateralToken.toHexString();
  entity.indexToken = event.params.indexToken.toHexString();
  entity.collateralDelta = event.params.collateralDelta;
  entity.sizeDelta = event.params.sizeDelta;
  entity.isLong = event.params.isLong;
  entity.price = event.params.price;
  entity.fee = event.params.fee;

  entity.transaction = _createTransactionIfNotExist(event);
  entity.timestamp = event.block.timestamp.toI32();

  entity.save();
}

export function handleDecreasePosition(event: vault.DecreasePosition): void {
  let id = event.transaction.hash.toHexString();
  let entity = new DecreasePosition(id);

  entity.key = event.params.key.toHexString();
  entity.account = event.params.account.toHexString();
  entity.collateralToken = event.params.collateralToken.toHexString();
  entity.indexToken = event.params.indexToken.toHexString();
  entity.collateralDelta = event.params.collateralDelta;
  entity.sizeDelta = event.params.sizeDelta;
  entity.isLong = event.params.isLong;
  entity.price = event.params.price;
  entity.fee = event.params.fee;

  entity.transaction = _createTransactionIfNotExist(event);
  entity.timestamp = event.block.timestamp.toI32();

  entity.save();
}

export function handleCollectMarginFees(event: vault.CollectMarginFees): void {
  let entity = new CollectMarginFee(event.transaction.hash.toHexString());

  entity.token = event.params.token;
  entity.feeTokens = event.params.feeTokens;
  entity.feeUsd = event.params.feeUsd;

  entity.transaction = _createTransactionIfNotExist(event);
  entity.timestamp = event.block.timestamp.toI32();

  entity.save();
}

export function handleCollectSwapFees(event: vault.CollectSwapFees): void {
  let entity = new CollectSwapFee(event.transaction.hash.toHexString());

  entity.token = event.params.token;
  entity.feeTokens = event.params.feeUsd;
  entity.feeUsd = event.params.feeTokens;

  entity.transaction = _createTransactionIfNotExist(event);
  entity.timestamp = event.block.timestamp.toI32();

  entity.save();
}

export function handleSwap(event: vault.Swap): void {
  let entity = new Swap(event.transaction.hash.toHexString());

  entity.account = event.params.account.toHexString();
  entity.tokenIn = event.params.tokenIn.toHexString();
  entity.tokenOut = event.params.tokenOut.toHexString();
  entity.amountIn = event.params.amountIn;
  entity.amountOut = event.params.amountOut;
  entity.amountOutAfterFees = event.params.amountOutAfterFees;
  entity.feeBasisPoints = event.params.feeBasisPoints;

  entity.transaction = _createTransactionIfNotExist(event);
  entity.timestamp = event.block.timestamp.toI32();

  entity.save();
}

export function handleAddLiquidity(event: vlpManager.AddLiquidity): void {
  let entity = new AddLiquidity(event.transaction.hash.toHexString());

  entity.account = event.params.account.toHexString();
  entity.token = event.params.token.toHexString();
  entity.amount = event.params.amount;
  entity.aumInUsdg = event.params.aumInUsdg;
  entity.vlpSupply = event.params.vlpSupply;
  entity.usdAmount = event.params.usdAmount;
  entity.mintAmount = event.params.mintAmount;

  entity.transaction = _createTransactionIfNotExist(event);
  entity.timestamp = event.block.timestamp.toI32();

  entity.save();
}

export function handleRemoveLiquidity(event: vlpManager.RemoveLiquidity): void {
  let entity = new RemoveLiquidity(event.transaction.hash.toHexString());

  entity.account = event.params.account.toHexString();
  entity.token = event.params.token.toHexString();
  entity.vlpAmount = event.params.vlpAmount;
  entity.aumInUsdg = event.params.aumInUsdg;
  entity.vlpSupply = event.params.vlpSupply;
  entity.usdAmount = event.params.usdAmount;
  entity.amountOut = event.params.amountOut;

  entity.transaction = _createTransactionIfNotExist(event);
  entity.timestamp = event.block.timestamp.toI32();

  entity.save();
}

export function handleStakeVwave(event: rewardRouter.StakeVwave): void {
  let entity = new StakeVwave(event.transaction.hash.toHexString());

  entity.account = event.params.account.toHexString();
  entity.token = event.params.token.toHexString();
  entity.amount = event.params.amount;

  entity.transaction = _createTransactionIfNotExist(event);
  entity.timestamp = event.block.timestamp.toI32();

  entity.save();
}

export function handleUnstakeVwave(event: rewardRouter.UnstakeVwave): void {
  let entity = new UnstakeVwave(event.transaction.hash.toHexString());

  entity.account = event.params.account.toHexString();
  entity.token = event.params.token.toHexString();
  entity.amount = event.params.amount;

  entity.transaction = _createTransactionIfNotExist(event);
  entity.timestamp = event.block.timestamp.toI32();

  entity.save();
}

export function handleStakeVlp(event: rewardRouter.StakeVlp): void {
  let entity = new StakeVlp(event.transaction.hash.toHexString());

  entity.account = event.params.account.toHexString();
  entity.amount = event.params.amount;

  entity.transaction = _createTransactionIfNotExist(event);
  entity.timestamp = event.block.timestamp.toI32();

  entity.save();
}

export function handleUnstakeVlp(event: rewardRouter.UnstakeVlp): void {
  let entity = new UnstakeVlp(event.transaction.hash.toHexString());

  entity.account = event.params.account.toHexString();
  entity.amount = event.params.amount;

  entity.transaction = _createTransactionIfNotExist(event);
  entity.timestamp = event.block.timestamp.toI32();

  entity.save();
}
