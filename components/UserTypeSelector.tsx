import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// كومبوننت لاختيار نوع المستخدم (Viewer أو Editor)
const UserTypeSelector = ({ userType, setUserType, onClickHandler }: UserTypeSelectorParams) => {

  // دالة لتحديث النوع المختار
  const accessChangeHandler = (type: UserType) => {
    setUserType(type); // تحديث الـ state المحلي للكومبوننت
    onClickHandler && onClickHandler(type); 
    // لو في callback تم تمريره من الأب، تنفذ مع النوع الجديد
    // ده يسمح للـ parent component يعرف التغيير ويعمل حاجته
  }

  return (
    <Select 
      value={userType} // القيمة الحالية للـ Select (مثلاً "viewer" أو "editor")
      onValueChange={(type: UserType) => accessChangeHandler(type)} 
      // لما المستخدم يغير الاختيار، تنفذ الـ accessChangeHandler بالاختيار الجديد
    >
      <SelectTrigger className="shad-select">
        <SelectValue /> {/* عرض القيمة الحالية للـ Select */}
      </SelectTrigger>
      <SelectContent className="border-none bg-dark-200">
        <SelectItem value="viewer" className="shad-select-item">
          can view 
        </SelectItem>
        <SelectItem value="editor" className="shad-select-item">
          can edit 
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export default UserTypeSelector
