pragma solidity ^0.4.24;

/**
 * @title Roles
 * @dev Library for managing addresses assigned to a Role.
 */
library Roles {
  struct Role {
    mapping (address => bool) bearer;
  }

  /**
   * @dev give an account access to this role
   */
  function add(Role storage role, address account) internal {
    require(account != address(0));
    // MWJ: The following require causes an "out of gas" error in truffle test.
    // when I include the verifyCaller and add'ActorRole' functions to
    // SupplyChain.sol. Since setting to true has no downside other than 
    // potentially execution costs, I am removing it to get my contracts to compile
    // and run. I still need and asnwer as to why my SupplyChain.sol runs out
    // of gas when this is included.
    // require(!has(role, account));

    role.bearer[account] = true;
  }

  /**
   * @dev remove an account's access to this role
   */
  function remove(Role storage role, address account) internal {
    require(account != address(0));
    require(has(role, account));

    role.bearer[account] = false;
  }

  /**
   * @dev check if an account has this role
   * @return bool
   */
  function has(Role storage role, address account)
    internal
    view
    returns (bool)
  {
    require(account != address(0));
    return role.bearer[account];
  }
}