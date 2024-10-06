import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, FlatList, Text, ActivityIndicator, Modal, Button } from "react-native";
import { Card } from "../../../components";
import { DemoDivider } from "../DemoDivider";
import { DemoUseCase } from "../DemoUseCase";
import { navigate } from "app/navigators";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { deleteIncome } from '../../../../server/actions/postActions';
import { formatDate } from "app/utils/formatDate";

const IncomeCards = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [incomes, setIncomes] = useState([]);
  const [filteredIncomes, setFilteredIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
  const [selectedIncomes, setSelectedIncomes] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [visibleIncomes, setVisibleIncomes] = useState([]);
  const [visiblePage, setVisiblePage] = useState(1);
  const itemsPerPage = 7;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const incomeDelete = useSelector(state => state.incomeDelete);
  const { loading: deleteLoading, error: deleteError, success: deleteSuccess } = incomeDelete;

  const incomeUpdate = useSelector((state: RootState) => state.incomeUpdate);
  const {  success: successUpdate } = incomeUpdate;

  const incomeCreate = useSelector((state: RootState) => state.incomeCreate)
  const {  success } = incomeCreate

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.get(`https://bridgerbyphil.pythonanywhere.com/api/v1/income/list/?page=${page}`, config);
      setIncomes((prevIncomes) => [...prevIncomes, ...response.data]);
      setTotalPages(response.data.total_pages || 1);
    } catch (error) {
      setError('Error fetching incomes');
      console.error('Error fetching incomes:', error);
    } finally {
      setLoading(false);
    }
  };

  const goToRegister = (id) => {
    navigate('Income', { id });
  };

  const handleDelete = () => {
    selectedIncomes.forEach(id => {
      dispatch(deleteIncome(id));
    });
    setConfirmDeleteModalVisible(false);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = incomes.filter(income =>
      income.source.toLowerCase().includes(text.toLowerCase()) ||
      income.description.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredIncomes(filtered);
  };

  const handleSelectIncome = (id) => {
    setSelectedIncomes(prevState =>
      prevState.includes(id) ? prevState.filter(incomeId => incomeId !== id) : [...prevState, id]
    );
  };

  const toggleSelectionMode = () => {
    setIsSelecting(!isSelecting);
    if (isSelecting) {
      setSelectedIncomes([]);
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchData();
    }
  }, [userInfo, page]);

  useEffect(() => {
    if (deleteError) {
      setIncomes([]);
      setPage(1);
      fetchData();
      setSelectedIncomes([]);
    }
  }, [deleteError]);

  useEffect(() => {
    if (success) {
      setIncomes([]);
      setPage(1);
      fetchData();
      setSelectedIncomes([]);
    }
  }, [success]);

  useEffect(() => {
    if (successUpdate) {
      setIncomes([]);
      setPage(1);
      fetchData();
      setSelectedIncomes([]);
    }
  }, [successUpdate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [incomes]);

  useEffect(() => {
    setVisibleIncomes(filteredIncomes.slice(0, visiblePage * itemsPerPage));
  }, [filteredIncomes, visiblePage]);

  const renderIncome = ({ item }) => (
    <TouchableOpacity
      onPress={() => isSelecting ? handleSelectIncome(item.id) : goToRegister(item.id)}
      style={styles.cardContainer}
    >
      {isSelecting && (
        <View style={styles.selectionIndicator}>
          {selectedIncomes.includes(item.id) && <Icon name="check" size={20} color="green" />}
        </View>
      )}
      <Card
        heading={`Amount: ${item.amount}`}
        content={`Source: ${item.source}\nDescription: ${item.description}`}
        footer={`Date Received: ${formatDate(item.created_at)}`}
      />
    </TouchableOpacity>
  );

  return (
    <DemoUseCase name="Incomes" description="Click On An Income To Customize">
      {showHint && (
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>Tap "Edit" to select and delete multiple incomes.</Text>
        </View>
      )}
      <TextInput
        style={styles.searchInput}
        placeholder="Search Incomes"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <View style={styles.header}>
        <Button title={isSelecting ? "Cancel" : "Edit"} onPress={toggleSelectionMode} />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={visibleIncomes}
          renderItem={renderIncome}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <DemoDivider />}
          refreshing={refreshing}
          onRefresh={() => {
            setIncomes([]);
            setPage(1);
            fetchData();
          }}
        />
      )}
      {visibleIncomes.length < filteredIncomes.length && (
        <Button
          title="Load More"
          onPress={() => setVisiblePage(visiblePage + 1)}
        />
      )}
      {deleteLoading && <ActivityIndicator size="large" color="red" />}
      {deleteError && <Text style={styles.errorText}>{deleteError}</Text>}

      {isSelecting && (
        <TouchableOpacity style={styles.deleteButton} onPress={() => setConfirmDeleteModalVisible(true)}>
          <Text style={styles.deleteButtonText}>Delete Selected</Text>
        </TouchableOpacity>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmDeleteModalVisible}
        onRequestClose={() => setConfirmDeleteModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Are you sure you want to delete the selected incomes?</Text>
            <View style={styles.buttonContainer}>
              <Button title="Yes" onPress={handleDelete} style={styles.yesButton} />
              <Button title="No" onPress={() => setConfirmDeleteModalVisible(false)} style={styles.noButton} />
            </View>
          </View>
        </View>
      </Modal>
    </DemoUseCase>
  );
};

const styles = StyleSheet.create({
  hintContainer: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  hintText: {
    color: 'black',
    fontWeight: 'bold',
  },
  searchInput: {
    margin: 10,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  selectionIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.5)', // Increased opacity
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    borderWidth: 2, // Increased border width
    borderColor: 'rgba(255,255,255,0.5)', // Increased border opacity
    backdropFilter: 'blur(20px)', // Increased blur
    boxShadow: '20px 20px 40px -6px rgba(0,0,0,0.2)',
    position: 'relative',
    transition: 'all 0.2s ease-in-out',
  },
  modalTitle: {
    fontWeight: '500',
    color: '#fff',
    opacity: 0.7,
    fontSize: 18,
    marginTop: 0,
    marginBottom: 20,
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  yesButton: {
    marginRight: 10,
    borderRadius: 10, // Curved buttons
  },
  noButton: {
    marginLeft: 10,
    borderRadius: 10, // Curved buttons
  },
});

export default IncomeCards;
