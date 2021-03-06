import { CardBackOffice } from 'common/styles'
import React, { useEffect, useState } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { alertToast, confirm } from 'services/alerts'
import { deleteMembers } from 'store/slices/members'
import { Row } from './styles'

export default function MemberCard ({ member }) {
  const { isError, isSuccess, message } = useSelector(state => state.members)

  const [deleteMember, setDeleteMember] = useState(false)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleEdit = (id) => {
    navigate(`${id}`)
  }

  const handleDelete = () => {
    confirm(() => setDeleteMember(true), 'Eliminar el Miembro ?')
  }

  useEffect(() => {
    if (deleteMember) {
      dispatch(deleteMembers(member.id))
    }
  }, [deleteMember, member.id, dispatch])

  useEffect(() => {
    if (isError) alertToast('error', message)
    if (deleteMember && isSuccess) alertToast('success', 'Miembro Eliminado correctamente')
    setDeleteMember(false)
  }, [isError, dispatch, deleteMember])

  return (
    <CardBackOffice>
      <Row>
        <div className='name'>{member.name}</div>
        <div className='actions'>
          <button
            className='edit'
            onClick={() => handleEdit(member.id)}
          >
            <FaEdit />
          </button>
          <button
            className='delete'
            onClick={() => handleDelete()}
          >
            <FaTrash />
          </button>
        </div>
      </Row>
    </CardBackOffice>
  )
}
