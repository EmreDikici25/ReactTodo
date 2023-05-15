import { useState } from "react";
import Todo from "./components/Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState({});

  //Ekle butonuna tıklandığında yeni todo oluşturur
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todoText) {
      alert("Form u doldurunuz");
      return;
    }

    // todo için gerekli bilgileri içeren obje oluşturma
    const newTodo = {
      id: new Date().getTime(),
      title: todoText,
      date: new Date().toLocaleString(),
      isDone: false,
    };

    //oluşturulan todo objesini todolar stateine aktarma
    //spread operatorle önceden eklenenleri muhafaza etme
    setTodos([...todos, newTodo]);

    //Eleman eklenince form u sıfırlama
    setTodoText("");
  };

  // Silme butonuna tıklandığında çalışır
  //todo dizisini gezer ve id si silinecek todonun id sine eşit olmayanları döndürür
  const handleDelete = (deletedTodo) => {
    const filtred = todos.filter((item) => item.id !== deletedTodo.id);
    setTodos(filtred);
  };

  // Yapıldı butonuna tıklanıldığında çalışır
  // 1- Düzenlenecek todonun dizideki sırasını bulur
  // 2- Düzenlenecek todonun isDone değerini tersine çevirme
  // 3- Todo yu diziden çıkarıp yerine düzenlenmiş halini koyma
  // 4- Todo lar dizisinin bir kopyasını oluşturup onu güncelledik
  // 5- Güncellenen kopyayı todo ların yeni değeri olarak tanımladık
  const handleDone = (todo) => {
    const index = todos.findIndex((item) => item.id === todo.id);

    const newValue = !todos[index].isDone;

    const changedTodo = { ...todo, isDone: newValue };

    const newTodos = [...todos];

    newTodos.splice(index, 1, changedTodo);

    setTodos(newTodos);
  };

  //Edit save butonuna tıklandığında yeni değerleri değişen objeyi diziye aktarma
  const handleSaveEdit = () => {
    //Splice için değişecek elemanın dizideki yerini buldum(index i)
    let index = todos.findIndex((item) => item.id === editingTodo.id);

    //Direkt olarak state i değiştirmek yerine todo dizisinin bir kopyasını oluşturduk
    const cloneTodos = [...todos];

    //Dizinin güncellenecek todoyu çıkarıp yerine düzenlenmiş todoyu ekledik
    cloneTodos.splice(index, 1, editingTodo);

    //Ekrana bastığımız diziyi güncelledik
    setTodos(cloneTodos);

    //Kaydedildikten sonra modal ı kapatma
    setShowModal(false);
  };

  return (
    <div>
      <h1 className="bg-dark">CRUD</h1>
      <div className="container border p-2 mt-2 rounded">
        <form onSubmit={handleSubmit} className="d-flex gap-3">
          <input
            className="form-control"
            type="text"
            placeholder="Yapılacakları giriniz..."
            value={todoText}
            onChange={(e) => {
              setTodoText(e.target.value);
            }}
          />
          <button className="btn btn-warning btn-lg">Ekle</button>
        </form>

        <div className="d-flex flex-column gap-2 py-3">
          {/* Eğer state içerisi boş ise ekrana basıyoruz */}
          {todos.length === 0 && (
            <h2 className="text-center">Yapılacak bir işiniz yok</h2>
          )}

          {/* Eğer state içinde eleman varsa elemanları ekrana basıyoruz */}
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              handleDelete={handleDelete}
              todo={todo}
              handleDone={handleDone}
              setShowModal={setShowModal}
              setEditingTodo={setEditingTodo}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-wrapper">
          <div className="edit-modal">
            <h4>Yeni Değeri Giriniz ...</h4>
            <input
              value={editingTodo.title}
              onChange={(e) =>
                setEditingTodo({
                  ...editingTodo,
                  title: e.target.value,
                  date: new Date().toLocaleString(),
                })
              }
              type="text"
            />
            <button
              className="btn btn-danger w-25"
              onClick={() => setShowModal(false)}
            >
              İptal Et
            </button>
            <button className="btn btn-info w-25" onClick={handleSaveEdit}>
              Kaydet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
