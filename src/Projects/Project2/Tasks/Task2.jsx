import React, { useState } from "react";

class TreeNode {
  constructor(phoneNumber, subscriber) {
    this.phoneNumber = phoneNumber;  
    this.subscriber = subscriber;  
    this.left = null; 
    this.right = null;  
  }
}

class SubscriberTree {
  constructor() {
    this.root = null;
  }

  insert(phoneNumber, subscriber) {
    const newNode = new TreeNode(phoneNumber, subscriber);
    if (!this.root) {
      this.root = newNode;
    } else {
      this._insertNode(this.root, newNode);
    }
  }

  _insertNode(node, newNode) {
    if (newNode.phoneNumber < node.phoneNumber) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
  }

  inOrderTraversal(node, result = []) {
    if (node) {
      this.inOrderTraversal(node.left, result);
      result.push(node.subscriber);
      this.inOrderTraversal(node.right, result);
    }
    return result;
  }

  search(phoneNumber) {
    return this._searchNode(this.root, phoneNumber);
  }

  _searchNode(node, phoneNumber) {
    if (!node) return null;
    if (node.phoneNumber === phoneNumber) {
      return node.subscriber;
    }
    if (phoneNumber < node.phoneNumber) {
      return this._searchNode(node.left, phoneNumber);
    }
    return this._searchNode(node.right, phoneNumber);
  }

  countByTariff() {
    const tariffCounts = {};
    this._countTariffs(this.root, tariffCounts);
    return tariffCounts;
  }

  _countTariffs(node, tariffCounts) {
    if (node) {
      const { tariff } = node.subscriber;
      tariffCounts[tariff] = (tariffCounts[tariff] || 0) + 1;
      this._countTariffs(node.left, tariffCounts);
      this._countTariffs(node.right, tariffCounts);
    }
  }
}

const SubscriberTreeComponent = () => {
  const [tree] = useState(new SubscriberTree());
  const [subscribers, setSubscribers] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [tariffCounts, setTariffCounts] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subscriberData, setSubscriberData] = useState({
    phoneNumber: "",
    lastName: "",
    firstName: "",
    middleName: "",
    tariff: "",
  });

  const handleAddSubscriber = () => {
    const { phoneNumber, lastName, firstName, middleName, tariff } =
      subscriberData;
    tree.insert(phoneNumber, {
      phoneNumber,
      lastName,
      firstName,
      middleName,
      tariff,
    });
    setSubscribers(tree.inOrderTraversal(tree.root));  
  };

  const handleSearchSubscriber = () => {
    const result = tree.search(phoneNumber);
    setSearchResult(result || "Subscriber not found");
  };

  const handleCountTariffs = () => {
    const counts = tree.countByTariff();
    setTariffCounts(counts);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubscriberData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>Subscriber Management</h1>
 
      <h2>Add Subscriber</h2>
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="middleName"
        placeholder="Middle Name"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="tariff"
        placeholder="Tariff Plan"
        onChange={handleInputChange}
      />
      <button onClick={handleAddSubscriber}>Add Subscriber</button>
 
      <h2>Subscriber List</h2>
      <table>
        <thead>
          <tr>
            <th>Phone Number</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Tariff</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((subscriber, index) => (
            <tr key={index}>
              <td>{subscriber.phoneNumber}</td>
              <td>{subscriber.lastName}</td>
              <td>{subscriber.firstName}</td>
              <td>{subscriber.middleName}</td>
              <td>{subscriber.tariff}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Search Subscriber */}
      <h2>Search Subscriber</h2>
      <input
        type="text"
        placeholder="Search by Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleSearchSubscriber}>Search</button>
      <div>
        <h3>Search Result:</h3>
        {searchResult ? (
          typeof searchResult === "string" ? (
            <p>{searchResult}</p>
          ) : (
            <p>
              {searchResult.lastName} {searchResult.firstName}{" "}
              {searchResult.middleName} - {searchResult.tariff}
            </p>
          )
        ) : null}
      </div>

      {/* Count Tariffs */}
      <h2>Tariff Counts</h2>
      <button onClick={handleCountTariffs}>Count Tariffs</button>
      <ul>
        {Object.entries(tariffCounts).map(([tariff, count]) => (
          <li key={tariff}>
            {tariff}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriberTreeComponent;
